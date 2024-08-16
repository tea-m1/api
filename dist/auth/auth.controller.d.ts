import { AuthService } from './auth.service';
import { UserEntity } from '../entity/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(userSignUp: UserSignupDto): Promise<UserEntity>;
    login(userLogin: UserLoginDto): Promise<{
        access_token: string;
    }>;
}
