import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('blacklisted_tokens')
export class BlacklistedTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  token: string;

  @CreateDateColumn()
  createdat: Date;

  @DeleteDateColumn()
  deletedat: Date;
}
