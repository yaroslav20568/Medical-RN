import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserUpdateDto } from './dto/user.dto';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @HttpCode(200)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Delete('user/:id')
  @HttpCode(200)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @Put('user/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userDto);
  }
}
