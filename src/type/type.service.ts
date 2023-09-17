import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TypeDto } from './dto/type.dto';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async getTypes(): Promise<Type[]> {
    return this.prisma.type.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createType(typeDto: TypeDto) {
    const findType: Type = await this.prisma.type.findUnique({
      where: { name: typeDto.name },
    });

    if (findType) {
      throw new HttpException(
        'A type with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.type.create({
      data: typeDto,
    });
  }

  async deleteType(id: number): Promise<Type> {
    const findType: Type = await this.prisma.type.findUnique({
      where: { id: id },
    });

    if (!findType) {
      throw new HttpException(
        'No type with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.type.delete({
      where: {
        id: id,
      },
    });
  }

  async updateType(id: number, typeDto: TypeDto): Promise<Type> {
    const findType: Type = await this.prisma.type.findUnique({
      where: { id: id },
    });

    if (!findType) {
      throw new HttpException(
        'No type with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.type.update({
      where: {
        id: id,
      },
      data: typeDto,
    });
  }
}
