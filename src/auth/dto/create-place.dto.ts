import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { LocationEntity } from '../../entity/location.entity';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  location?: LocationEntity;
}
