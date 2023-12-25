import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Laboratory } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Express } from 'multer';
import { unlinkSync } from 'node:fs';
import {
  LaboratoryDto,
  LaboratoryUpdateDto,
  LaboratoryQuery,
} from './dto/laboratory.dto';
import { CityDto } from 'src/city/dto/city.dto';
import { TypeDto } from 'src/type/dto/type.dto';
import ILaboratories from './types';

@Injectable()
export class LaboratoryService {
  constructor(private prisma: PrismaService) {}

  async getLaboratories(
    laboratoryQuery: LaboratoryQuery,
  ): Promise<ILaboratories> {
    const totalPages = Math.ceil(
      (await this.prisma.laboratory.findMany()).length / 10,
    );

    const findLaboratories = this.prisma.laboratory.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
      include: {
        city: {
          include: { country: true },
        },
        type: true,
      },
      skip: laboratoryQuery.skip ? +laboratoryQuery.skip : 0,
      take: 10,
      where: {
        name: { contains: laboratoryQuery.name, mode: 'insensitive' },
      },
    });

    return {
      skip: laboratoryQuery.skip ? +laboratoryQuery.skip : 0,
      totalSkip: (totalPages - 1) * 10,
      items: await findLaboratories,
    };
  }

  async createLaboratory(
    file: Express.Multer.File,
    laboratoryDto: LaboratoryDto,
  ): Promise<Laboratory> {
    const findLaboratory: Laboratory = await this.prisma.laboratory.findUnique({
      where: { name: laboratoryDto.name },
    });

    if (findLaboratory) {
      throw new HttpException(
        'A laboratory with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (laboratoryDto.cityId) {
      const findCity: CityDto = await this.prisma.city.findUnique({
        where: { id: laboratoryDto.cityId },
      });

      const findType: TypeDto = await this.prisma.type.findUnique({
        where: { id: laboratoryDto.typeId },
      });

      if (!findCity) {
        throw new HttpException(
          'No city with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (!findType) {
        throw new HttpException(
          'No type with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.prisma.laboratory.create({
      data: {
        name: laboratoryDto.name,
        cityId: laboratoryDto.cityId,
        region: laboratoryDto.region,
        address: laboratoryDto.address,
        coordinates: laboratoryDto.coordinates,
        phone: laboratoryDto.phone,
        email: laboratoryDto.email,
        socialNetwork: laboratoryDto.socialNetwork,
        linkWebsite: laboratoryDto.linkWebsite,
        description: laboratoryDto.description,
        addInfo: laboratoryDto.addInfo,
        workingHours: laboratoryDto.workingHours,
        typeId: laboratoryDto.typeId,
        photo: file ? 'laboratories/' + file?.originalname : 'no-image.jpg',
        typesUsers: laboratoryDto.typesUsers,
      },
      include: {
        city: true,
        type: true,
      },
    });
  }

  async deleteLaboratory(id: number): Promise<Laboratory> {
    const findLaboratory: Laboratory = await this.prisma.laboratory.findUnique({
      where: { id: id },
    });

    if (!findLaboratory) {
      throw new HttpException(
        'No laboratory with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (findLaboratory.photo !== 'no-image.jpg') {
      unlinkSync(`uploads/laboratories/${findLaboratory.photo}`);
    }

    return this.prisma.laboratory.delete({
      where: {
        id: id,
      },
      include: {
        city: true,
        type: true,
      },
    });
  }

  async updateLaboratory(
    id: number,
    file: Express.Multer.File,
    laboratoryDto: LaboratoryUpdateDto,
  ): Promise<Laboratory> {
    const findLaboratory: Laboratory = await this.prisma.laboratory.findUnique({
      where: { id: id },
    });

    if (!findLaboratory) {
      throw new HttpException(
        'No laboratory with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (laboratoryDto.cityId) {
      const findCity: CityDto = await this.prisma.city.findUnique({
        where: { id: laboratoryDto.cityId },
      });

      const findType: TypeDto = await this.prisma.type.findUnique({
        where: { id: laboratoryDto.typeId },
      });

      if (!findCity) {
        throw new HttpException(
          'No city with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (!findType) {
        throw new HttpException(
          'No type with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.prisma.laboratory.update({
      where: {
        id: id,
      },
      data: {
        name: laboratoryDto.name,
        cityId: laboratoryDto.cityId,
        region: laboratoryDto.region,
        address: laboratoryDto.address,
        coordinates: laboratoryDto.coordinates,
        phone: laboratoryDto.phone,
        email: laboratoryDto.email,
        socialNetwork: laboratoryDto.socialNetwork,
        linkWebsite: laboratoryDto.linkWebsite,
        description: laboratoryDto.description,
        addInfo: laboratoryDto.addInfo,
        workingHours: laboratoryDto.workingHours,
        typeId: laboratoryDto.typeId,
        photo: file && 'laboratories/' + file?.originalname,
        typesUsers: laboratoryDto.typesUsers,
      },
    });
  }
}
