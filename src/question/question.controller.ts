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
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';
import { QuestionDto } from './dto/question.dto';
import { Question } from '@prisma/client';

@ApiTags('Question')
@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('questions')
  @HttpCode(200)
  getQuestions(): Promise<Question[]> {
    return this.questionService.getQuestions();
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
