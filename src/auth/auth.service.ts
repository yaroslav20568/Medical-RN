import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(userDto: UserDto) {
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
      data: { ...userDto, password: await bcrypt.hash(userDto.password, 10) },
    });

    const tokens = await this.getNewTokens((await newUser).id);

    return {
      user: await this.returnUserFields(await newUser),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
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

  async getNewTokens(userId: number) {
    const payload = { id: userId };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
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

  async returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      gender: user.gender,
      typesUsers: user.typesUsers,
      city: user.city,
    };
  }
}
