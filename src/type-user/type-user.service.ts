import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeUser } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TypeUserDto } from './dto/type-user.dto';

@Injectable()
export class TypeUserService {
  constructor(private prisma: PrismaService) {}

  async getTypes(): Promise<TypeUser[]> {
    return this.prisma.typeUser.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createType(typeDto: TypeUserDto) {
    const findType: TypeUser = await this.prisma.typeUser.findUnique({
      where: { name: typeDto.name },
    });

    if (findType) {
      throw new HttpException(
        'A type-user with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.typeUser.create({
      data: typeDto,
    });
  }

  async deleteType(id: number): Promise<TypeUser> {
    const findType: TypeUser = await this.prisma.typeUser.findUnique({
      where: { id: id },
    });

    if (!findType) {
      throw new HttpException(
        'No type-user with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.typeUser.delete({
      where: {
        id: id,
      },
    });
  }

  async updateType(id: number, typeDto: TypeUserDto): Promise<TypeUser> {
    const findType: TypeUser = await this.prisma.typeUser.findUnique({
      where: { id: id },
    });

    if (!findType) {
      throw new HttpException(
        'No type with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.typeUser.update({
      where: {
        id: id,
      },
      data: typeDto,
    });
  }
}
