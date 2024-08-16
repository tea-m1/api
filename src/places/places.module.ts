import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistModule } from '../blacklist/blacklist.module';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlacesEntity } from '../entity/places.entity';

@Module({
  controllers: [PlacesController],
  imports: [TypeOrmModule.forFeature([PlacesEntity]), BlacklistModule],
  exports: [TypeOrmModule],
  providers: [PlacesService, JwtAuthGuard, JwtService],
})
export class PlacesModule {}
