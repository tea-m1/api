import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: false })
  longitude: number;
}
