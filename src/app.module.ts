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
import { SpeciesModule } from './species/species.module';
import { FileModule } from './file/file.module';
import { SpeciesController } from './species/species.controller';
import { SpeciesService } from './species/species.service';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    JwtModule,
    BlacklistModule,
    SpeciesModule,
    FileModule,
    PlacesModule,
  ],
  controllers: [AppController, UserController, SpeciesController],
  providers: [UserService, AppService, JwtService, SpeciesService],
})
export class AppModule {}
