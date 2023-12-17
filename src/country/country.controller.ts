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
  HttpCode,
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
  @HttpCode(200)
  getCountries(): Promise<Country[]> {
    return this.countryService.getCountries();
  }

  @Post('country')
  @HttpCode(200)
  createCountry(@Body() countryDto: CountryDto): Promise<Country> {
    return this.countryService.createCountry(countryDto);
  }

  @Delete('country/:id')
  @HttpCode(200)
  async deleteCountry(@Param('id', ParseIntPipe) id: number): Promise<Country> {
    return this.countryService.deleteCountry(id);
  }

  @Put('country/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() countryDto: CountryDto,
  ): Promise<Country> {
    return this.countryService.updateCountry(id, countryDto);
  }
}
