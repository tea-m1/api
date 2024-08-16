import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from '../auth/dto/create-place.dto';
import { UpdatePlaceDto } from '../auth/dto/update-place.dto';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { RolesGuard } from '../core/roles.guard';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../entity/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Roles(Role.USER)
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.placesService.findAll(page, pageSize);
  }

  @Roles(Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
