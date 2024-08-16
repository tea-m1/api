import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesEntity } from '../entity/species.entity';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { BlacklistModule } from '../blacklist/blacklist.module';

@Module({
  controllers: [SpeciesController],
  imports: [TypeOrmModule.forFeature([SpeciesEntity]), BlacklistModule],
  exports: [TypeOrmModule],
  providers: [SpeciesService, JwtAuthGuard, JwtService],
})
export class SpeciesModule {}
