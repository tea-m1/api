import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entity/file.entity';
import { Repository } from 'typeorm';
import { SpeciesEntity } from '../entity/species.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async findBySpecies(param: SpeciesEntity): Promise<FileEntity[]> {
    return await this.fileRepository.findBy({ species: param });
  }
}
