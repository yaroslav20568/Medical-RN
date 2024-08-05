import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Express } from 'multer';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { ITokens, IUser, IUserModific, IUserWithTokens } from 'src/user/types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(file: Express.Multer.File, userDto: UserDto): Promise<IUserModific> {
    const findUser: User = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });

    if (findUser) {
      throw new HttpException(
        'A user with this email has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const newUser = this.prisma.user.create({
      data: {
				email: userDto.email,
				password: await bcrypt.hash(userDto.password, 10),
				gender: userDto.gender,
				typesUsers: userDto.typesUsers,
				city: userDto.city,
        imageUrl: file ? 'users/' + file?.originalname : 'users/no-image.png',
				role: userDto.role,
      },
    });

    return {
      user: await this.returnUserFields(await newUser),
    };
  }

  async login(loginDto: LoginDto): Promise<IUserWithTokens> {
    const findUser: User = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!findUser) {
      throw new HttpException(
        'No user with this email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!(await bcrypt.compare(loginDto.password, findUser.password))) {
      throw new HttpException(
        'No valid password for this user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const { password, ...userData } = findUser;

    const tokens = await this.getNewTokens(findUser.id);

    return {
      user: userData,
      ...tokens,
    };
  }

  async getNewTokens(userId: number): Promise<ITokens> {
    const payload = { id: userId };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string): Promise<IUserWithTokens> {
    const data = this.jwtService.verify(refreshToken);

    if (!data) {
      throw new HttpException(
        'Invalid refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user: User = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    const tokens = await this.getNewTokens(user.id);

    return {
      user: await this.returnUserFields(await user),
      ...tokens,
    };
  }

  async returnUserFields(user: User): Promise<IUser> {
    return {
      id: user.id,
      email: user.email,
      gender: user.gender,
      typesUsers: user.typesUsers,
      city: user.city,
      imageUrl: user.imageUrl,
			role: user.role
    };
  }
}
