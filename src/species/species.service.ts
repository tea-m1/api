import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesEntity } from '../entity/species.entity';
import { CreateSpeciesDto } from '../auth/dto/create-species.dto';
import { PaginationDto } from '../auth/dto/pagination.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
  ) {}

  async findAll(pagination: PaginationDto): Promise<{
    total: number;
    data: SpeciesEntity[];
    pageSize: number;
    page: number;
  }> {
    const { page, pageSize } = pagination;
    const [result, total] = await this.speciesRepository.findAndCount({
      take: pagination.page,
      skip: pagination.page * pagination.pageSize,
    });
    return {
      data: result,
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string): Promise<SpeciesEntity> {
    const species = await this.speciesRepository.findOne({ where: { id } });
    if (!species) {
      throw new NotFoundException(`Species with ID ${id} not found`);
    }
    return species;
  }

  async create(
    createSpeciesDtos: CreateSpeciesDto[],
  ): Promise<SpeciesEntity[]> {
    const species = this.speciesRepository.create(createSpeciesDtos);
    return this.speciesRepository.save(species);
  }

  async update(
    id: string,
    updateSpeciesDto: CreateSpeciesDto,
  ): Promise<SpeciesEntity> {
    const species = await this.findOne(id);
    Object.assign(species, updateSpeciesDto);
    return this.speciesRepository.save(species);
  }

  async remove(id: string): Promise<void> {
    const species = await this.findOne(id);
    await this.speciesRepository.remove(species);
  }
}
