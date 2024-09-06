import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { QuizDto } from './dto/quiz.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getQuizzes(): Promise<Quiz[]> {
    return this.prisma.quiz.findMany({
      include: {
        questions: {
					include: {
						answers: true,
					},
				},
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createQuiz(quizDto: QuizDto): Promise<Quiz> {
    const findQuiz: Quiz = await this.prisma.quiz.findUnique({
      where: { name: quizDto.name },
    });

    if (findQuiz) {
      throw new HttpException(
        'A quiz with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.quiz.create({
      data: quizDto,
    });
  }

  async deleteQuiz(id: number): Promise<Quiz> {
    const findQuiz: Quiz = await this.prisma.quiz.findUnique({
      where: { id: id },
    });

    if (!findQuiz) {
      throw new HttpException(
        'No quiz with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.quiz.delete({
      where: {
        id,
      },
    });
  }

  async updateQuiz(id: number, quizDto: QuizDto): Promise<Quiz> {
    const findQuiz: Quiz = await this.prisma.quiz.findUnique({
      where: { id: id },
    });

    if (!findQuiz) {
      throw new HttpException(
        'No quiz with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.quiz.update({
      where: {
        id,
      },
      data: quizDto,
    });
  }
}
