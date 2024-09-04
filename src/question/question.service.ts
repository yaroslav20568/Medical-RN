import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { QuestionDto, QuestionUpdateDto } from './dto/question.dto';
import { QuizDto } from 'src/quiz/dto/quiz.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(): Promise<Question[]> {
    return this.prisma.question.findMany({
      include: {
        answers: true,
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createQuestion(questionDto: QuestionDto): Promise<Question> {
    const findQuestion: Question = await this.prisma.question.findUnique({
      where: { name: questionDto.name },
    });

    const findQuiz: QuizDto = await this.prisma.quiz.findUnique({
      where: { id: questionDto.quizId },
    });

    if (findQuestion) {
      throw new HttpException(
        'A question with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!findQuiz) {
      throw new HttpException(
        'No quiz with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.question.create({
      data: questionDto,
    });
  }

  async deleteQuestion(id: number): Promise<Question> {
    const findQuestion: Question = await this.prisma.question.findUnique({
      where: { id: id },
    });

    if (!findQuestion) {
      throw new HttpException(
        'No question with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.question.delete({
      where: {
        id,
      },
    });
  }

  async updateQuestion(id: number, questionDto: QuestionUpdateDto): Promise<Question> {
    const findQuestion: Question = await this.prisma.question.findUnique({
      where: { id: id },
    });

    if (!findQuestion) {
      throw new HttpException(
        'No question with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (questionDto.quizId) {
      const findQuiz: QuizDto = await this.prisma.quiz.findUnique({
        where: { id: questionDto.quizId },
      });

      if (!findQuiz) {
        throw new HttpException(
          'No quiz with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.prisma.question.update({
      where: {
        id,
      },
      data: questionDto,
    });
  }
}
