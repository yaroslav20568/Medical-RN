import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question, QuestionAnswer } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { QuestionAnswerDto, QuestionAnswerUpdateDto } from './dto/question-answer.dto';

@Injectable()
export class QuestionAnswerService {
  constructor(private prisma: PrismaService) {}

  async getQuestionAnswers(): Promise<QuestionAnswer[]> {
    return this.prisma.questionAnswer.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createQuestionAnswer(questionAnswerDto: QuestionAnswerDto): Promise<QuestionAnswer> {
    const findQuestionAnswer: QuestionAnswer = await this.prisma.questionAnswer.findUnique({
      where: { name: questionAnswerDto.name },
    });

    const findQuestion: Question = await this.prisma.question.findUnique({
      where: { id: questionAnswerDto.questionId },
    });

    if (findQuestionAnswer) {
      throw new HttpException(
        'A question answer with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!findQuestion) {
      throw new HttpException(
        'No question with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.questionAnswer.create({
      data: questionAnswerDto,
    });
  }

  async deleteQuestionAnswer(id: number): Promise<QuestionAnswer> {
    const findQuestionAnswer: QuestionAnswer = await this.prisma.questionAnswer.findUnique({
      where: { id: id },
    });

    if (!findQuestionAnswer) {
      throw new HttpException(
        'No question answer with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.questionAnswer.delete({
      where: {
        id,
      },
    });
  }

  async updateQuestionAnswer(id: number, questionAnswerDto: QuestionAnswerUpdateDto): Promise<QuestionAnswer> {
    const findQuestionAnswer: QuestionAnswer = await this.prisma.questionAnswer.findUnique({
      where: { id: id },
    });

    if (!findQuestionAnswer) {
      throw new HttpException(
        'No question answer with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (questionAnswerDto.questionId) {
      const findQuestion: Question = await this.prisma.question.findUnique({
        where: { id: questionAnswerDto.questionId },
      });

      if (!findQuestion) {
        throw new HttpException(
          'No question with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.prisma.questionAnswer.update({
      where: {
        id,
      },
      data: questionAnswerDto,
    });
  }
}
