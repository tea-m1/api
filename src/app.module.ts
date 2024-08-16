import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { configService } from './core/core.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { JwtAuthGuard } from './core/jwt-auth.guard';
import { RolesGuard } from './core/roles.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    JwtModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, JwtAuthGuard, JwtService, RolesGuard],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
