import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Role } from '../../entity/role.enum';

export class UserSignupDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  firstName: string;
  username: string;
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsEnum(['MALE', 'FEMALE'])
  gender: 'MALE' | 'FEMALE';

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  birthPlace: string;

  @IsNotEmpty()
  @MinLength(14)
  phone: string;

  @IsEnum(Role, { each: true })
  role: Role[];
}
