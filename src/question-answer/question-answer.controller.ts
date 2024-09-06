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
import { QuestionAnswerService } from './question-answer.service';
import { ApiTags } from '@nestjs/swagger';
import { QuestionAnswerDto, QuestionAnswerUpdateDto } from './dto/question-answer.dto';
import { QuestionAnswer } from '@prisma/client';

@ApiTags('Question-answer')
@Controller()
export class QuestionAnswerController {
  constructor(private readonly questionAnswerService: QuestionAnswerService) {}

  @Get('question-answer')
  @HttpCode(200)
  getQuestionAnswers(): Promise<QuestionAnswer[]> {
    return this.questionAnswerService.getQuestionAnswers();
  }

  @Post('question-answer')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  createQuestionAnswer(@Body() questionAnswerDto: QuestionAnswerDto): Promise<QuestionAnswer> {
    return this.questionAnswerService.createQuestionAnswer(questionAnswerDto);
  }

  @Delete('question-answer/:id')
  @HttpCode(200)
  async deleteQuestionAnswer(@Param('id', ParseIntPipe) id: number): Promise<QuestionAnswer> {
    return this.questionAnswerService.deleteQuestionAnswer(id);
  }

  @Put('question-answer/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateQuestionAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() questionAnswerDto: QuestionAnswerUpdateDto,
  ): Promise<QuestionAnswer> {
    return this.questionAnswerService.updateQuestionAnswer(id, questionAnswerDto);
  }
}
