import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { LocationEntity } from './location.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  userName: string;

  @Column({ type: 'varchar', length: 250 })
  lastName: string;

  @Column({ type: 'varchar', length: 250 })
  firstName: string;

  @Column({ type: 'varchar', length: 14 })
  phone: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE'] })
  gender: 'MALE' | 'FEMALE';

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'varchar', length: 250 })
  birthPlace: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role[];

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @OneToOne(() => LocationEntity, { cascade: true, eager: true })
  @JoinColumn()
  location: LocationEntity;
}
