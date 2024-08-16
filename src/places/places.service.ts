import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacesEntity } from '../entity/places.entity';
import { CreatePlaceDto } from '../auth/dto/create-place.dto';
import { UpdatePlaceDto } from '../auth/dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlacesEntity)
    private readonly placesRepository: Repository<PlacesEntity>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<PlacesEntity> {
    const place = this.placesRepository.create(createPlaceDto);
    return this.placesRepository.save(place);
  }

  async findAll(
    page: number = 0,
    pageSize: number = 5,
  ): Promise<{
    total: number;
    data: PlacesEntity[];
    pageSize: number;
    page: number;
  }> {
    const [data, total] = await this.placesRepository.findAndCount({
      skip: page * pageSize,
      take: pageSize,
    });
    return { data, total, page, pageSize };
  }

  async findOne(id: string): Promise<PlacesEntity> {
    return this.placesRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<PlacesEntity> {
    await this.placesRepository.update(id, updatePlaceDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.placesRepository.delete(id);
  }
}
