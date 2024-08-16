import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../entity/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  exports: [TypeOrmModule],
  providers: [FileService],
})
export class FileModule {}
