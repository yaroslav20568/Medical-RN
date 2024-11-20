import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Analysis, User } from '@prisma/client';
import { Express } from 'multer';
import { unlinkSync } from 'node:fs';
import { PrismaService } from 'src/prisma.service';
import { AnalysisDto, AnalysisQuery, AnalysisUpdateDto } from './dto/analysis.dto';
import { IAnalysis } from './types';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  async getAnalyzes(analysisQuery: AnalysisQuery): Promise<IAnalysis> {
		const count = 5;
    const totalPages = Math.ceil(
      (await this.prisma.analysis.findMany()).length / count,
    );

    const findAnalyzes = this.prisma.analysis.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
			include: {
        user: true,
      },
			skip: analysisQuery.skip ? +analysisQuery.skip : 0,
      take: count,
			where: {
				userId: analysisQuery.userId ? +analysisQuery.userId : undefined,
			}
    });

		if(!analysisQuery.userId) {
			throw new HttpException(
        'A param userId required',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
		}

		return {
      skip: analysisQuery.skip ? +analysisQuery.skip : 0,
      totalSkip: (totalPages - 1) * count,
      items: await findAnalyzes,
    };
  }

  async createAnalysis(file: Express.Multer.File, analysisDto: AnalysisDto): Promise<Analysis> {
    const findAnalysis: Analysis = await this.prisma.analysis.findUnique({
      where: { name: analysisDto.name },
    });

		const findUser: User = await this.prisma.user.findUnique({
      where: { id: analysisDto.userId },
    });

    if (findAnalysis) {
      throw new HttpException(
        'A analysis with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

		if (!findUser) {
      throw new HttpException(
        'No user with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.analysis.create({
      data: {
				name: analysisDto.name,
				userId: analysisDto.userId,
				category: analysisDto.category,
				photo: file ? 'analyzes/' + file?.originalname : 'analyzes/no-image.jpg',
				date: analysisDto.date,
			},
    });
  }

  async deleteAnalysis(id: number): Promise<Analysis> {
    const findAnalysis: Analysis = await this.prisma.analysis.findUnique({
      where: { id: id },
    });

    if (!findAnalysis) {
      throw new HttpException(
        'No analysis with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (findAnalysis.photo !== 'analyzes/no-image.jpg') {
      unlinkSync(`uploads/${findAnalysis.photo}`);
    }

    return this.prisma.analysis.delete({
      where: {
        id: id,
      },
    });
  }

  async updateAnalysis(id: number, file: Express.Multer.File, analysisUpdateDto: AnalysisUpdateDto): Promise<Analysis> {
		const findAnalysis: Analysis = await this.prisma.analysis.findUnique({
      where: { id: id },
    });

    if (!findAnalysis) {
      throw new HttpException(
        'No analysis with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.analysis.update({
      where: {
        id: id,
      },
      data: {
				name: analysisUpdateDto.name,
				userId: analysisUpdateDto.userId,
				category: analysisUpdateDto.category,
				photo: file ? 'analyzes/' + file?.originalname : 'analyzes/no-image.jpg',
				date: analysisUpdateDto.date,
			},
    });
  }
}
