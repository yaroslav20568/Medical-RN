import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LibraryArticle } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LibraryArticleDto, LibraryArticleUpdateDto } from './dto/library-article.dto';

@Injectable()
export class LibraryArticleService {
  constructor(private prisma: PrismaService) {}

  async getLibraryArticles(): Promise<LibraryArticle[]> {
    return this.prisma.libraryArticle.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createLibraryArticle(libraryArticleDto: LibraryArticleDto) {
    const findLibraryArticle: LibraryArticle = await this.prisma.libraryArticle.findUnique({
      where: { name: libraryArticleDto.name },
    });

    if (findLibraryArticle) {
      throw new HttpException(
        'A library article with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.libraryArticle.create({
      data: libraryArticleDto,
    });
  }

  async deleteLibraryArticle(id: number): Promise<LibraryArticle> {
    const findLibraryArticle: LibraryArticle = await this.prisma.libraryArticle.findUnique({
      where: { id: id },
    });

    if (!findLibraryArticle) {
      throw new HttpException(
        'No library article with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.libraryArticle.delete({
      where: {
        id: id,
      },
    });
  }

  async updateLibraryArticle(id: number, libraryArticleUpdateDto: LibraryArticleUpdateDto): Promise<LibraryArticle> {
    const findLibraryArticle: LibraryArticle = await this.prisma.libraryArticle.findUnique({
      where: { id: id },
    });

    if (!findLibraryArticle) {
      throw new HttpException(
        'No library article with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.libraryArticle.update({
      where: {
        id: id,
      },
      data: libraryArticleUpdateDto,
    });
  }
}
