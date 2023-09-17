import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async getCountries(): Promise<Country[]> {
    return this.prisma.country.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createCountry(countryDto: CountryDto): Promise<Country> {
    const findCountry: Country = await this.prisma.country.findUnique({
      where: { name: countryDto.name },
    });

    if (findCountry) {
      throw new HttpException(
        'A country with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.country.create({
      data: countryDto,
    });
  }

  async deleteCountry(id: number): Promise<Country> {
    const findCountry: Country = await this.prisma.country.findUnique({
      where: { id: id },
    });

    if (!findCountry) {
      throw new HttpException(
        'No country with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.country.delete({
      where: {
        id,
      },
    });
  }

  async updateCountry(id: number, countryDto: CountryDto): Promise<Country> {
    const findCountry: Country = await this.prisma.country.findUnique({
      where: { id: id },
    });

    if (!findCountry) {
      throw new HttpException(
        'No country with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.country.update({
      where: {
        id,
      },
      data: countryDto,
    });
  }
}
