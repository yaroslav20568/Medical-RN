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
import { QuizService } from './quiz.service';
import { ApiTags } from '@nestjs/swagger';
import { QuizDto } from './dto/quiz.dto';
import { Quiz } from '@prisma/client';

@ApiTags('Quiz')
@Controller()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('quizzes')
  @HttpCode(200)
  getCities(): Promise<Quiz[]> {
    return this.quizService.getQuizzes();
  }

  @Post('quiz')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  createQuiz(@Body() quizDto: QuizDto): Promise<Quiz> {
    return this.quizService.createQuiz(quizDto);
  }

  @Delete('quiz/:id')
  @HttpCode(200)
  async deleteQuiz(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return this.quizService.deleteQuiz(id);
  }

  @Put('quiz/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateQuiz(
    @Param('id', ParseIntPipe) id: number,
    @Body() quizDto: QuizDto,
  ): Promise<Quiz> {
    return this.quizService.updateQuiz(id, quizDto);
  }
}
