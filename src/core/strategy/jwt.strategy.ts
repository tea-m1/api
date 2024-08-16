import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../auth/auth.service';
import { UserProfile } from '../../auth/model/userprofile.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: 'HS256',
      secretOrKey: 'secret',
    });
  }

  async validate(payload: UserProfile) {
    return this.authService.validate(payload);
  }
}
