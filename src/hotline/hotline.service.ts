import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Hotline } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { HotlineDto, HotlineQuery, HotlineUpdateDto } from './dto/hotline.dto';
import { IHotline } from './types';

@Injectable()
export class HotlineService {
  constructor(private prisma: PrismaService) {}

  async getHotlines(hotlineQuery: HotlineQuery): Promise<IHotline> {
		const count = 5;
		const totalPages = Math.ceil(
      (await this.prisma.hotline.findMany()).length / count,
    );
		
    const findHotlines = this.prisma.hotline.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
			skip: hotlineQuery.skip ? +hotlineQuery.skip : 0,
      take: count,
    });

		return {
      skip: hotlineQuery.skip ? +hotlineQuery.skip : 0,
      totalSkip: (totalPages - 1) * count,
      items: await findHotlines,
    };
  }

  async createHotline(hotlineDto: HotlineDto) {
    const findHotline: Hotline = await this.prisma.hotline.findUnique({
      where: { type: hotlineDto.type },
    });

    if (findHotline) {
      throw new HttpException(
        'A hotline with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.hotline.create({
      data: hotlineDto,
    });
  }

  async deleteHotline(id: number): Promise<Hotline> {
    const findHotline: Hotline = await this.prisma.hotline.findUnique({
      where: { id: id },
    });

    if (!findHotline) {
      throw new HttpException(
        'No hotline with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.hotline.delete({
      where: {
        id: id,
      },
    });
  }

  async updateHotline(id: number, hotlineUpdateDto: HotlineUpdateDto): Promise<Hotline> {
    const findHotline: Hotline = await this.prisma.hotline.findUnique({
      where: { id: id },
    });

    if (!findHotline) {
      throw new HttpException(
        'No hotline with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.hotline.update({
      where: {
        id: id,
      },
      data: hotlineUpdateDto,
    });
  }
}
