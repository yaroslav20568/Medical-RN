import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Laboratory, City, Type } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Express } from 'multer';
import { unlinkSync } from 'node:fs';
import {
  LaboratoryDto,
  LaboratoryUpdateDto,
  LaboratoryQuery,
} from './dto/laboratory.dto';
import { ILaboratory } from './types';

@Injectable()
export class LaboratoryService {
  constructor(private prisma: PrismaService) {}

  async getLaboratories(
    laboratoryQuery: LaboratoryQuery,
  ): Promise<ILaboratory> {
		const count = 10;
    const totalPages = Math.ceil(
      (await this.prisma.laboratory.findMany()).length / count,
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
      take: count,
      where: {
        name: { contains: laboratoryQuery.name, mode: 'insensitive' },
        region: laboratoryQuery.region ? laboratoryQuery.region : undefined,
        cityId: laboratoryQuery.cityId ? +laboratoryQuery.cityId : undefined,
        typeId: laboratoryQuery.typeId ? +laboratoryQuery.typeId : undefined,
        AND: laboratoryQuery.typesUsers.split(',').map((typeUser) => ({
					typesUsers: laboratoryQuery.typesUsers
						? { contains: typeUser }
						: undefined,
				})),
      },
    });

    return {
      skip: laboratoryQuery.skip ? +laboratoryQuery.skip : 0,
      totalSkip: (totalPages - 1) * count,
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
      const findCity: City = await this.prisma.city.findUnique({
        where: { id: laboratoryDto.cityId },
      });

      if (!findCity) {
        throw new HttpException(
          'No city with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

		if (laboratoryDto.cityId) {
			const findType: Type = await this.prisma.type.findUnique({
        where: { id: laboratoryDto.typeId },
      });
			
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
        photo: file ? 'laboratories/' + file?.originalname : 'laboratories/no-image.jpg',
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

    if (findLaboratory.photo !== 'laboratories/no-image.jpg') {
      unlinkSync(`uploads/${findLaboratory.photo}`);
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
      const findCity: City = await this.prisma.city.findUnique({
        where: { id: laboratoryDto.cityId },
      });

      if (!findCity) {
        throw new HttpException(
          'No city with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

		if (laboratoryDto.typeId) {
			const findType: Type = await this.prisma.type.findUnique({
        where: { id: laboratoryDto.typeId },
      });

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
			include: {
        city: true,
        type: true,
      },
    });
  }
}
