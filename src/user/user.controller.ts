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
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express, diskStorage } from 'multer';
import { User } from '@prisma/client';
import { UserUpdateDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
	@ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
		@UploadedFile('file') file: Express.Multer.File,
    @Body() userDto: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(id, file, userDto);
  }
}
