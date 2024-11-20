import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HelpAbroad, City, Type } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Express } from 'multer';
import { unlinkSync } from 'node:fs';
import {
  HelpAbroadDto,
  HelpAbroadUpdateDto,
  HelpAbroadQuery,
} from './dto/help-abroad.dto';
import { IHelpAbroad } from './types';

@Injectable()
export class HelpAbroadService {
  constructor(private prisma: PrismaService) {}

  async getHelpAbroads(
    helpAbroadQuery: HelpAbroadQuery,
  ): Promise<IHelpAbroad> {
		const count = 10;
    let totalPages;

    const findHelpAbroads = this.prisma.helpAbroad.findMany({
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
      skip: helpAbroadQuery.skip ? +helpAbroadQuery.skip : 0,
      take: count,
      where: {
        name: { contains: helpAbroadQuery.name, mode: 'insensitive' },
				city: { countryId: helpAbroadQuery.countryId ? +helpAbroadQuery.countryId : undefined },
        cityId: helpAbroadQuery.cityId ? +helpAbroadQuery.cityId : undefined,
        typeId: helpAbroadQuery.typeId ? +helpAbroadQuery.typeId : undefined,
        AND: helpAbroadQuery.typesUsers ? 
					helpAbroadQuery.typesUsers.split(',').map((typeUser) => ({
						typesUsers: { contains: typeUser }
					})) : 
					undefined,
      },
    });

		if(!helpAbroadQuery.name && !helpAbroadQuery.countryId  && !helpAbroadQuery.cityId && !helpAbroadQuery.typeId && !helpAbroadQuery.typesUsers) {
			totalPages = Math.ceil(
				(await this.prisma.helpAbroad.findMany()).length / count,
			);
		} else {
			totalPages = Math.ceil(
				(await findHelpAbroads).length / count,
			);
		}

    return {
      skip: helpAbroadQuery.skip ? +helpAbroadQuery.skip : 0,
      totalSkip: (totalPages - 1) * count,
      items: await findHelpAbroads,
    };
  }

  async createHelpAbroad(
    file: Express.Multer.File,
    helpAbroadDto: HelpAbroadDto,
  ): Promise<HelpAbroad> {
    const findHelpAbroad: HelpAbroad = await this.prisma.helpAbroad.findUnique({
      where: { name: helpAbroadDto.name },
    });

    if (findHelpAbroad) {
      throw new HttpException(
        'A help abroad with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (helpAbroadDto.cityId) {
      const findCity: City = await this.prisma.city.findUnique({
        where: { id: helpAbroadDto.cityId },
      });

      if (!findCity) {
        throw new HttpException(
          'No city with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

		if (helpAbroadDto.cityId) {
			const findType: Type = await this.prisma.type.findUnique({
        where: { id: helpAbroadDto.typeId },
      });
			
			if (!findType) {
        throw new HttpException(
          'No type with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
		}

    return this.prisma.helpAbroad.create({
      data: {
        name: helpAbroadDto.name,
        cityId: helpAbroadDto.cityId,
        address: helpAbroadDto.address,
        coordinates: helpAbroadDto.coordinates,
        phone: helpAbroadDto.phone,
        email: helpAbroadDto.email,
        socialNetwork: helpAbroadDto.socialNetwork,
        linkWebsite: helpAbroadDto.linkWebsite,
        description: helpAbroadDto.description,
        addInfo: helpAbroadDto.addInfo,
        workingHours: helpAbroadDto.workingHours,
        typeId: helpAbroadDto.typeId,
        photo: file ? 'help-abroads/' + file?.originalname : 'help-abroads/no-image.jpg',
        typesUsers: helpAbroadDto.typesUsers,
      },
      include: {
        city: true,
        type: true,
      },
    });
  }

  async deleteHelpAbroad(id: number): Promise<HelpAbroad> {
    const findHelpAbroad: HelpAbroad = await this.prisma.helpAbroad.findUnique({
      where: { id: id },
    });

    if (!findHelpAbroad) {
      throw new HttpException(
        'No help abroad with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (findHelpAbroad.photo !== 'help-abroads/no-image.jpg') {
      unlinkSync(`uploads/${findHelpAbroad.photo}`);
    }

    return this.prisma.helpAbroad.delete({
      where: {
        id: id,
      },
      include: {
        city: true,
        type: true,
      },
    });
  }

  async updateHelpAbroad(
    id: number,
    file: Express.Multer.File,
    helpAbroadDto: HelpAbroadUpdateDto,
  ): Promise<HelpAbroad> {
    const findHelpAbroad: HelpAbroad = await this.prisma.helpAbroad.findUnique({
      where: { id: id },
    });

    if (!findHelpAbroad) {
      throw new HttpException(
        'No help abroad with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (helpAbroadDto.cityId) {
      const findCity: City = await this.prisma.city.findUnique({
        where: { id: helpAbroadDto.cityId },
      });

      if (!findCity) {
        throw new HttpException(
          'No city with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

		if (helpAbroadDto.typeId) {
			const findType: Type = await this.prisma.type.findUnique({
        where: { id: helpAbroadDto.typeId },
      });

			if (!findType) {
        throw new HttpException(
          'No type with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
		}

    return this.prisma.helpAbroad.update({
      where: {
        id: id,
      },
      data: {
        name: helpAbroadDto.name,
        cityId: helpAbroadDto.cityId,
        address: helpAbroadDto.address,
        coordinates: helpAbroadDto.coordinates,
        phone: helpAbroadDto.phone,
        email: helpAbroadDto.email,
        socialNetwork: helpAbroadDto.socialNetwork,
        linkWebsite: helpAbroadDto.linkWebsite,
        description: helpAbroadDto.description,
        addInfo: helpAbroadDto.addInfo,
        workingHours: helpAbroadDto.workingHours,
        typeId: helpAbroadDto.typeId,
        photo: file && 'help-abroads/' + file?.originalname,
        typesUsers: helpAbroadDto.typesUsers,
      },
			include: {
        city: true,
        type: true,
      },
    });
  }
}
