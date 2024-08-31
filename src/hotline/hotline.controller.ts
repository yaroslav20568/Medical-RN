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
	Query,
} from '@nestjs/common';
import { HotlineService } from './hotline.service';
import { ApiTags } from '@nestjs/swagger';
import { Hotline } from '@prisma/client';
import { HotlineDto, HotlineQuery, HotlineUpdateDto } from './dto/hotline.dto';
import { IHotline } from './types';

@ApiTags('Hotline')
@Controller()
export class HotlineController {
  constructor(private readonly hotlineService: HotlineService) {}

  @Get('hotlines')
  @HttpCode(200)
  async getHotlines(@Query() hotlineQuery: HotlineQuery): Promise<IHotline> {
    return this.hotlineService.getHotlines(hotlineQuery);
  }

  @Post('hotline')
  @HttpCode(200)
  async createhotline(@Body() hotlineDto: HotlineDto): Promise<Hotline> {
    return this.hotlineService.createHotline(hotlineDto);
  }

  @Delete('hotline/:id')
  @HttpCode(200)
  async deleteHotline(@Param('id', ParseIntPipe) id: number): Promise<Hotline> {
    return this.hotlineService.deleteHotline(id);
  }

  @Put('hotline/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateHotline(
    @Param('id', ParseIntPipe) id: number,
    @Body() hotlineUpdateDto: HotlineUpdateDto,
  ): Promise<Hotline> {
    return this.hotlineService.updateHotline(id, hotlineUpdateDto);
  }
}
