import { IsString, IsOptional } from 'class-validator';
import { LocationEntity } from '../../entity/location.entity';

export class UpdatePlaceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  location?: LocationEntity;
}
