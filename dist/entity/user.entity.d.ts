import { Role } from './role.enum';
export declare abstract class UserEntity {
    id: string;
    isActive: boolean;
    isLogged: boolean;
    email: string;
    name: string;
    lastName: string;
    role: Role[];
    password: string;
}
