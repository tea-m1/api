import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { CurrentUser } from '../core/decorators/user.decorator';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../entity/role.enum';
import { UserProfile } from '../auth/model/userprofile.model';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  @Roles(Role.USER)
  getProfile(@CurrentUser() user: UserProfile) {
    return user;
  }
}
