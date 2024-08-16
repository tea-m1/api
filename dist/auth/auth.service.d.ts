import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';
export declare class AuthService {
    private jwtService;
    private usersRepository;
    constructor(jwtService: JwtService, usersRepository: Repository<UserEntity>);
    signup(users: UserSignupDto): Promise<UserEntity>;
    validateUser(users: UserLoginDto): Promise<UserEntity>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    validate(payload: any): {
        userId: any;
        email: any;
        role: any;
    };
}
