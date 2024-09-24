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
import { AnalysisService } from './analysis.service';
import { ApiTags } from '@nestjs/swagger';
import { Analysis } from '@prisma/client';
import { AnalysisDto, AnalysisQuery, AnalysisUpdateDto } from './dto/analysis.dto';

@ApiTags('Analysis')
@Controller()
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('analyzes')
  @HttpCode(200)
  async getAnalyzes(@Query() analysisQuery: AnalysisQuery): Promise<Analysis[]> {
    return this.analysisService.getAnalyzes(analysisQuery);
  }

  @Post('analysis')
  @HttpCode(200)
	@UsePipes(new ValidationPipe())
  async createAnalysis(@Body() analysisDto: AnalysisDto): Promise<Analysis> {
    return this.analysisService.createAnalysis(analysisDto);
  }

  @Delete('analysis/:id')
  @HttpCode(200)
  async deleteAnalysis(@Param('id', ParseIntPipe) id: number): Promise<Analysis> {
    return this.analysisService.deleteAnalysis(id);
  }

  @Put('analysis/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateAnalysis(
    @Param('id', ParseIntPipe) id: number,
    @Body() analysisUpdateDto: AnalysisUpdateDto,
  ): Promise<Analysis> {
    return this.analysisService.updateAnalysis(id, analysisUpdateDto);
  }
}
