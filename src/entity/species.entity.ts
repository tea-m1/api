import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SpeciesTypeEnum } from './species-type.enum';
import { FileEntity } from './file.entity';

@Entity()
export class SpeciesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  scientificname: string;

  @Column({
    type: 'enum',
    enum: SpeciesTypeEnum,
    array: true,
  })
  type: SpeciesTypeEnum[];

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @OneToMany(() => FileEntity, (file) => file.species, {
    cascade: true,
    eager: true,
  })
  images: FileEntity[];

  @Column({ type: 'enum', enum: ['ANIMAL', 'PLANT'] })
  entitytype: 'ANIMAL' | 'PLANT';
}
