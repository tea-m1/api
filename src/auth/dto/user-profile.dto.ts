import { IsPhoneNumber } from '../../core/decorators/phone-number.decorator';
import { Role } from '../../entity/role.enum';
import { LocationEntity } from '../../entity/location.entity';

export class UserProfile {
  id: string;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  @IsPhoneNumber()
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: Date;
  birthPlace: string;
  registrationDate: Date;
  role: Role;
  location: LocationEntity;
}
