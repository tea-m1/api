import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserEntity } from '../../entity/user.entity';

export class UserSignupDto extends UserEntity {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
