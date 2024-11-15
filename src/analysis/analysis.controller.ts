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
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Analysis } from '@prisma/client';
import { AnalysisDto, AnalysisQuery, AnalysisUpdateDto } from './dto/analysis.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, diskStorage } from 'multer';
import { IAnalysis } from './types';

@ApiTags('Analysis')
@Controller()
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('analyzes')
  @HttpCode(200)
  async getAnalyzes(@Query() analysisQuery: AnalysisQuery): Promise<IAnalysis> {
    return this.analysisService.getAnalyzes(analysisQuery);
  }

  @Post('analysis')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/analyzes',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  createAnalysis(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() analysisDto: AnalysisDto,
  ): Promise<Analysis> {
    return this.analysisService.createAnalysis(file, analysisDto);
  }

  @Delete('analysis/:id')
  @HttpCode(200)
  async deleteAnalysis(@Param('id', ParseIntPipe) id: number): Promise<Analysis> {
    return this.analysisService.deleteAnalysis(id);
  }

  @Put('analysis/:id')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/analyzes',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAnalysis(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile('file') file: Express.Multer.File,
    @Body() analysisDto: AnalysisUpdateDto,
  ): Promise<Analysis> {
    return this.analysisService.updateAnalysis(id, file, analysisDto);
  }
}
