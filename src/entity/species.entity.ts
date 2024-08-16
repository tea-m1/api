import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SpeciesTypeEnum } from './species-type.enum';

@Entity()
export class SpeciesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  scientificName: string;

  @Column({
    type: 'enum',
    enum: SpeciesTypeEnum,
    array: true,
  })
  type: SpeciesTypeEnum[];

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column({
    type: 'enum',
    enum: ['ANIMAL', 'PLANT'],
  })
  entityType: 'ANIMAL' | 'PLANT';
}
