import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../entity/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() userSignUp: UserSignupDto): Promise<UserEntity> {
    return this.authService.signup(userSignUp);
  }
  @Post('login')
  async login(
    @Body() userLogin: UserLoginDto,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(userLogin);
    if (user) {
      return this.authService.login(user);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
