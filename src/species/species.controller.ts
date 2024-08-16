import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { Role } from '../entity/role.enum';
import { Roles } from '../core/decorators/roles.decorator';
import { CreateSpeciesDto } from '../auth/dto/create-species.dto';
import { RolesGuard } from '../core/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}
  @Get()
  @Roles(Role.USER)
  async findAll(
    @Query('page') page: number = 0,
    @Query('pageSize') pageSize: number = 5,
  ) {
    return this.speciesService.findAll({ page, pageSize });
  }

  @Get(':id')
  @Roles(Role.USER)
  async findOne(@Param('id') id: string) {
    return this.speciesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createSpeciesDtos: CreateSpeciesDto[]) {
    return this.speciesService.create(createSpeciesDtos);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSpeciesDto: CreateSpeciesDto,
  ) {
    return this.speciesService.update(id, updateSpeciesDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.speciesService.remove(id);
  }
}
