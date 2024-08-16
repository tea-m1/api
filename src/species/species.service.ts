import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesEntity } from '../entity/species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
  ) {}
}
