import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { Express } from 'multer';
import { PrismaService } from 'src/prisma.service';
import { UserUpdateDto } from './dto/user.dto';
import { unlinkSync } from 'fs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async deleteUser(id: number): Promise<User> {
    const findUser: User = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!findUser) {
      throw new HttpException(
        'No user with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (findUser.imageUrl !== 'no-image.jpg') {
      unlinkSync(`uploads/${findUser.imageUrl}`);
    }

    return this.prisma.user.delete({
      where: { id: id },
    });
  }

  async updateUser(
    id: number,
    file: Express.Multer.File,
    userDto: UserUpdateDto,
  ): Promise<User> {
    const findUser: User = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!findUser) {
      throw new HttpException(
        'No user with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
				email: userDto.email,
				gender: userDto.gender,
				typesUsers: userDto.typesUsers,
				city: userDto.city,
        password: userDto.password ? await bcrypt.hash(userDto.password, 10) : findUser.password,
        imageUrl: file && 'users/' + file?.originalname,
				role: userDto.role,
      },
    });
  }

  findOne(id: number): Promise<User | undefined> {
    const user = this.prisma.user.findUnique({
      where: { id: id },
    });

    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
