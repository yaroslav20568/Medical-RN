import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Hotline } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { HotlineDto, HotlineUpdateDto } from './dto/hotline.dto';

@Injectable()
export class HotlineService {
  constructor(private prisma: PrismaService) {}

  async getHotlines(): Promise<Hotline[]> {
    return this.prisma.hotline.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
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
