import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity()
export class PlacesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => LocationEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'locationid' })
  location: LocationEntity;
}
