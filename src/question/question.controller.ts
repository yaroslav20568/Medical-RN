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
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import { QuestionDto, QuestionQuery } from './dto/question.dto';
import { Question } from '@prisma/client';

@ApiTags('Question')
@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('questions')
  @HttpCode(200)
  getQuestions(@Query() questionQuery: QuestionQuery): Promise<Question[]> {
    return this.questionService.getQuestions(questionQuery);
  }

	@Get('questions-with-results')
  @HttpCode(200)
  getQuestionsWithResults(): Promise<Question[]> {
    return this.questionService.getQuestionsWithResults();
  }

  @Post('question')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  createQuestion(@Body() questionDto: QuestionDto): Promise<Question> {
    return this.questionService.createQuestion(questionDto);
  }

  @Delete('question/:id')
  @HttpCode(200)
  async deleteQuestion(@Param('id', ParseIntPipe) id: number): Promise<Question> {
    return this.questionService.deleteQuestion(id);
  }

  @Put('question/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateQuestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() questionDto: QuestionDto,
  ): Promise<Question> {
    return this.questionService.updateQuestion(id, questionDto);
  }
}
