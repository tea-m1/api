import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configService } from './core/core.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BlacklistModule } from './blacklist/blacklist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    JwtModule,
    BlacklistModule,
  ],
  controllers: [AppController, UserController],
  providers: [UserService, AppService, JwtService],
})
export class AppModule {}
