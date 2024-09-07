import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { City, Country } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CityDto, CityUpdateDto } from './dto/city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async getCities(): Promise<City[]> {
    return this.prisma.city.findMany({
      include: {
        country: true,
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createCity(cityDto: CityDto): Promise<City> {
    const findCity: City = await this.prisma.city.findUnique({
      where: { name: cityDto.name },
    });

    const findCountry: Country = await this.prisma.country.findUnique({
      where: { id: cityDto.countryId },
    });

    if (findCity) {
      throw new HttpException(
        'A city with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!findCountry) {
      throw new HttpException(
        'No country with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.city.create({
      data: cityDto,
    });
  }

  async deleteCity(id: number): Promise<City> {
    const findCity: City = await this.prisma.city.findUnique({
      where: { id: id },
    });

    if (!findCity) {
      throw new HttpException(
        'No city with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.city.delete({
      where: {
        id,
      },
    });
  }

  async updateCity(id: number, cityDto: CityUpdateDto): Promise<City> {
    const findCity: City = await this.prisma.city.findUnique({
      where: { id: id },
    });

    if (!findCity) {
      throw new HttpException(
        'No city with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (cityDto.countryId) {
      const findCountry: Country = await this.prisma.country.findUnique({
        where: { id: cityDto.countryId },
      });

      if (!findCountry) {
        throw new HttpException(
          'No country with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.prisma.city.update({
      where: {
        id,
      },
      data: cityDto,
    });
  }
}
