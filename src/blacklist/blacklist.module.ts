import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistService } from './blacklist.service';
import { BlacklistedTokenEntity } from '../entity/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedTokenEntity])],
  providers: [BlacklistService],
  exports: [BlacklistService],
})
export class BlacklistModule {}
