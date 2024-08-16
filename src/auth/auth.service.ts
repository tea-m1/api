import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserProfile } from './model/userprofile.model';
import { UserLoginDto } from './dto/user-login.dto';
import { Role } from '../entity/role.enum';
import { BlacklistService } from '../blacklist/blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  private getTokenExpiration(token: string): number {
    const decoded: any = this.verifyToken(token);
    return decoded.exp - Math.floor(Date.now() / 1000);
  }

  async signup(users: UserSignupDto): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(users.password);

    if (!users.username) {
      users.username = users.firstName;
    }

    const user = this.usersRepository.create({
      ...users,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity | null> {
    const user = await this.findUserByEmail(userLoginDto.email);

    if (
      user &&
      (await this.comparePasswords(userLoginDto.password, user.password))
    ) {
      return user;
    }

    return null;
  }

  async login(user: UserEntity): Promise<{ access_token: string }> {
    const payload = this.createPayload(user);
    const accessToken = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }

  async logout(token: string): Promise<void> {
    const expiration = this.getTokenExpiration(token);
    await this.blacklistService.addToBlacklist(token, expiration);
  }

  verifyToken(token: string): any {
    return this.jwtService.decode(token);
  }

  validate(payload: UserProfile) {
    return payload;
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async comparePasswords(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }

  private createPayload(user: UserEntity): {
    lastName: string;
    sub: string;
    address: string;
    role: Role[];
    gender: 'MALE' | 'FEMALE';
    birthDate: Date;
    birthPlace: string;
    firstName: string;
    phone: string;
    registrationDate: Date;
    id: string;
    email: string;
    username: string;
  } {
    return {
      address: user.address,
      birthDate: user.birthDate,
      birthPlace: user.birthPlace,
      firstName: user.firstName,
      gender: user.gender,
      id: user.id,
      lastName: user.lastName,
      phone: user.phone,
      registrationDate: user.registrationDate,
      username: user.userName,
      sub: user.id,
      email: user.email,
      role: user.role,
    };
  }

  private async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
