import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SpeciesTypeEnum } from '../../entity/species-type.enum';

export class CreateSpeciesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @IsEnum(SpeciesTypeEnum, { each: true })
  @IsNotEmpty()
  type: SpeciesTypeEnum[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image?: Buffer;

  @IsEnum(['ANIMAL', 'PLANT'])
  @IsNotEmpty()
  entityType: 'ANIMAL' | 'PLANT';
}
