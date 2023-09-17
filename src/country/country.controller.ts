import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiTags } from '@nestjs/swagger';
import { Country } from '@prisma/client';
import { CountryDto } from './dto/country.dto';

@ApiTags('Country')
@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('countries')
  getCountries(): Promise<Country[]> {
    return this.countryService.getCountries();
  }

  @Post('country')
  createCountry(@Body() countryDto: CountryDto): Promise<Country> {
    return this.countryService.createCountry(countryDto);
  }

  @Delete('country/:id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number): Promise<Country> {
    return this.countryService.deleteCountry(id);
  }

  @Put('country/:id')
  @UsePipes(new ValidationPipe())
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() countryDto: CountryDto,
  ): Promise<Country> {
    return this.countryService.updateCountry(id, countryDto);
  }
}
