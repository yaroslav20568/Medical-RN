import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { QuestionDto, QuestionQuery } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(questionQuery: QuestionQuery): Promise<Question[]> {
		if (!questionQuery.userId) {
      throw new HttpException(
        'A userId required param',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
		
		const findUser: User = await this.prisma.user.findUnique({
      where: { id: +questionQuery.userId },
    });

		if (!findUser) {
      throw new HttpException(
        'No user with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.question.findMany({
      include: {
        answers: {
					orderBy: [
						{
							id: 'asc',
						},
					],
				},
      },
			where: {
				questionResults: {
					every: {
						NOT: {
							userId: +questionQuery.userId,
						}
					}
				}
			},
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

	async getQuestionsWithResults(): Promise<Question[]> {
    return this.prisma.question.findMany({
      include: {
        answers: {
					orderBy: [
						{
							id: 'asc',
						},
					],
				},
				questionResults: true,
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

    if (findQuestion) {
      throw new HttpException(
        'A question with this name has already been created',
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

  async updateQuestion(id: number, questionDto: QuestionDto): Promise<Question> {
    const findQuestion: Question = await this.prisma.question.findUnique({
      where: { id: id },
    });

    if (!findQuestion) {
      throw new HttpException(
        'No question with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.question.update({
      where: {
        id,
      },
      data: questionDto,
    });
  }
}
