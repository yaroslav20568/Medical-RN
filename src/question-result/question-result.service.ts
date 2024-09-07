import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question, QuestionAnswer, QuestionResult, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { QuestionResultDto } from './dto/question-result.doto';

@Injectable()
export class QuestionResultService {
  constructor(private prisma: PrismaService) {}

  async getQuestionResults(): Promise<QuestionResult[]> {
    return this.prisma.questionResult.findMany({
      include: {
				question: true,
				questionAnswer: true,
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createQuestionResult(questionResultDto: QuestionResultDto): Promise<QuestionResult> {
		const findQuestion: Question = await this.prisma.question.findUnique({
      where: { id: questionResultDto.questionId },
    });

		const findQuestionAnswer: QuestionAnswer = await this.prisma.questionAnswer.findUnique({
      where: { id: questionResultDto.questionAnswerId },
    });

		const findUser: User = await this.prisma.user.findUnique({
      where: { id: questionResultDto.userId },
    });

		if (!findQuestion) {
      throw new HttpException(
        'No question with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

		if (!findQuestionAnswer) {
      throw new HttpException(
        'No question answer with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

		if (!findUser) {
      throw new HttpException(
        'No user answer with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.questionResult.create({
      data: questionResultDto,
    });
  }
}
