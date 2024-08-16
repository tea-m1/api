import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity('users')
export abstract class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isLogged: boolean;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role[];

  @Column({ type: 'varchar', length: 250 })
  password: string;
}
