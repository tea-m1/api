import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
    findByName(name: string): Promise<UserEntity | null>;
}
