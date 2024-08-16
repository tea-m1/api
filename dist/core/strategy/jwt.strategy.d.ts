import { Strategy } from 'passport-jwt';
import { AuthService } from '../../auth/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        role: any;
    }>;
}
export {};
