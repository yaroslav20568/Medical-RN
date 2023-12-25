import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { TypeUserService } from './type-user.service';
import { ApiTags } from '@nestjs/swagger';
import { TypeUser } from '@prisma/client';
import { TypeUserDto } from './dto/type-user.dto';

@ApiTags('Type-user')
@Controller()
export class TypeUserController {
  constructor(private readonly typeUserService: TypeUserService) {}

  @Get('types-users')
  @HttpCode(200)
  async getTypes(): Promise<TypeUser[]> {
    return this.typeUserService.getTypes();
  }

  @Post('type-user')
  @HttpCode(200)
  async createType(@Body() typeDto: TypeUserDto): Promise<TypeUser> {
    return this.typeUserService.createType(typeDto);
  }

  @Delete('type-user/:id')
  @HttpCode(200)
  async deleteType(@Param('id', ParseIntPipe) id: number): Promise<TypeUser> {
    return this.typeUserService.deleteType(id);
  }

  @Put('type-user/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeDto: TypeUserDto,
  ): Promise<TypeUser> {
    return this.typeUserService.updateType(id, typeDto);
  }
}
