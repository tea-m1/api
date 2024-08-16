import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(users: UserSignupDto): Promise<UserEntity> {
    const { id, email, password, lastName, name } = users;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      id,
      lastName,
      name,
      email,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async validateUser(users: UserLoginDto): Promise<UserEntity> {
    const email = users.email;
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(users.password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user){

  }

  validate(payload) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
