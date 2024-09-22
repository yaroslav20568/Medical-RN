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
import { TypeService } from './type.service';
import { ApiTags } from '@nestjs/swagger';
import { Type } from '@prisma/client';
import { TypeDto } from './dto/type.dto';

@ApiTags('Type')
@Controller()
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get('types')
  @HttpCode(200)
  async getTypes(): Promise<Type[]> {
    return this.typeService.getTypes();
  }

  @Post('type')
  @HttpCode(200)
	@UsePipes(new ValidationPipe())
  async createType(@Body() typeDto: TypeDto): Promise<Type> {
    return this.typeService.createType(typeDto);
  }

  @Delete('type/:id')
  @HttpCode(200)
  async deleteType(@Param('id', ParseIntPipe) id: number): Promise<Type> {
    return this.typeService.deleteType(id);
  }

  @Put('type/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeDto: TypeDto,
  ): Promise<Type> {
    return this.typeService.updateType(id, typeDto);
  }
}
