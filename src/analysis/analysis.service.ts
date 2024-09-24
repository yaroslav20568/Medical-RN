import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Analysis, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AnalysisDto, AnalysisQuery, AnalysisUpdateDto } from './dto/analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  async getAnalyzes(analysisQuery: AnalysisQuery): Promise<Analysis[]> {
    return this.prisma.analysis.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
			include: {
        user: true,
      },
			where: {
				userId: analysisQuery.userId ? +analysisQuery.userId : undefined,
			}
    });
  }

  async createAnalysis(analysisDto: AnalysisDto): Promise<Analysis> {
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
      data: analysisDto,
    });
  }

  async deleteAnalysis(id: number): Promise<Analysis> {
    const findAnalysis: Analysis = await this.prisma.analysis.findUnique({
      where: { id: id },
    });

    if (!findAnalysis) {
      throw new HttpException(
        'No analysis event with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.analysis.delete({
      where: {
        id: id,
      },
    });
  }

  async updateAnalysis(id: number, analysisUpdateDto: AnalysisUpdateDto): Promise<Analysis> {
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
      data: analysisUpdateDto,
    });
  }
}
