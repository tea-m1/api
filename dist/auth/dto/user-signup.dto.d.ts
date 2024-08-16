import { UserEntity } from '../../entity/user.entity';
export declare class UserSignupDto extends UserEntity {
    id: string;
    name: string;
    email: string;
    lastName: string;
    password: string;
}
