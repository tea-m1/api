import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BlacklistService } from '../blacklist/blacklist.service';
import { configService } from './core.module';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('token : ' + token);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const isBlacklisted = await this.blacklistService.isBlacklisted(token);
      if (isBlacklisted) {
        return false;
      } else {
        request.user = await this.jwtService.verifyAsync(token, {
          secret: configService.getJWTSecret(),
        });
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
