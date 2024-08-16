// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../entity/user.entity';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { BlacklistModule } from '../blacklist/blacklist.module';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60m', algorithm: 'HS256' },
    }),
    BlacklistModule,
  ],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
