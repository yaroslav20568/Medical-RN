import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { QuestionResultService } from './question-result.service';
import { ApiTags } from '@nestjs/swagger';
import { QuestionResultDto } from './dto/question-result.doto';
import { QuestionResult } from '@prisma/client';

@ApiTags('Question-result')
@Controller()
export class QuestionResultController {
  constructor(private readonly questionResultService: QuestionResultService) {}

  @Get('qestion-results')
  @HttpCode(200)
  getQuestionResults(): Promise<QuestionResult[]> {
    return this.questionResultService.getQuestionResults();
  }

  @Post('question-result')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  createQuestionResult(@Body() questionResultDto: QuestionResultDto): Promise<string> {
    return this.questionResultService.createQuestionResult(questionResultDto);
  }
}
