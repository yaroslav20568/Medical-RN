import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  UsePipes,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { HelpAbroadService } from './help-abroad.service';
import { HelpAbroad } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, diskStorage } from 'multer';
import {
  HelpAbroadDto,
  HelpAbroadQuery,
  HelpAbroadUpdateDto,
} from './dto/help-abroad.dto';
import { IHelpAbroad } from './types';

@ApiTags('Help-abroad')
@Controller()
export class HelpAbroadController {
  constructor(private readonly helpAbroadService: HelpAbroadService) {}

  @Get('help-abroads')
  @HttpCode(200)
  async getHelpAbroads(
    @Query() helpAbroadQuery: HelpAbroadQuery,
  ): Promise<IHelpAbroad> {
    return this.helpAbroadService.getHelpAbroads(helpAbroadQuery);
  }

  @Post('help-abroad')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/help-abroads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  createHelpAbroad(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() helpAbroadDto: HelpAbroadDto,
  ): Promise<HelpAbroad> {
    return this.helpAbroadService.createHelpAbroad(file, helpAbroadDto);
  }

  @Delete('help-abroad/:id')
  @HttpCode(200)
  async deleteHelpAbroad(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HelpAbroad> {
    return this.helpAbroadService.deleteHelpAbroad(id);
  }

  @Put('help-abroad/:id')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/help-abroads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateHelpAbroad(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile('file') file: Express.Multer.File,
    @Body() helpAbroadDto: HelpAbroadUpdateDto,
  ): Promise<HelpAbroad> {
    return this.helpAbroadService.updateHelpAbroad(id, file, helpAbroadDto);
  }
}
