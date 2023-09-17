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
  async getTypes(): Promise<Type[]> {
    return this.typeService.getTypes();
  }

  @Post('type')
  async createType(@Body() typeDto: TypeDto): Promise<Type> {
    return this.typeService.createType(typeDto);
  }

  @Delete('type/:id')
  async deleteType(@Param('id', ParseIntPipe) id: number): Promise<Type> {
    return this.typeService.deleteType(id);
  }

  @Put('type/:id')
  @UsePipes(new ValidationPipe())
  async updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeDto: TypeDto,
  ): Promise<Type> {
    return this.typeService.updateType(id, typeDto);
  }
}
