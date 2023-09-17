import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CityService } from './city.service';
import { ApiTags } from '@nestjs/swagger';
import { CityDto, CityUpdateDto } from './dto/city.dto';
import { City } from '@prisma/client';

@ApiTags('City')
@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('cities')
  getCities(): Promise<City[]> {
    return this.cityService.getCities();
  }

  @Post('city')
  @UsePipes(new ValidationPipe({ transform: true }))
  createCity(@Body() cityDto: CityDto): Promise<City> {
    return this.cityService.createCity(cityDto);
  }

  @Delete('city/:id')
  async deleteCity(@Param('id', ParseIntPipe) id: number): Promise<City> {
    return this.cityService.deleteCity(id);
  }

  @Put('city/:id')
  @UsePipes(new ValidationPipe())
  async updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() cityDto: CityUpdateDto,
  ): Promise<City> {
    return this.cityService.updateCity(id, cityDto);
  }
}
