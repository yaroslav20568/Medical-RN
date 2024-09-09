import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LibraryArticle, LibraryItem } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { LibraryItemDto, LibraryItemQuery, LibraryItemUpdateDto } from './dto/library-item.dto';

@Injectable()
export class LibraryItemService {
  constructor(private prisma: PrismaService) {}

  async getLibraryItems(libraryItemQuery: LibraryItemQuery): Promise<LibraryItem[]> {
    return this.prisma.libraryItem.findMany({
			where: { libraryArticleId: +libraryItemQuery.libraryArticleId },
      include: {
        libraryArticle: true,
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async createLibraryItem(libraryItemDto: LibraryItemDto): Promise<LibraryItem> {
    const findLibraryItem: LibraryItem = await this.prisma.libraryItem.findUnique({
      where: { title: libraryItemDto.title },
    });

    const findLibraryArticle: LibraryArticle = await this.prisma.libraryArticle.findUnique({
      where: { id: libraryItemDto.libraryArticleId },
    });

    if (findLibraryItem) {
      throw new HttpException(
        'A library item with this name has already been created',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!findLibraryArticle) {
      throw new HttpException(
        'No library article with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.libraryItem.create({
			include: {
        libraryArticle: true,
      },
      data: libraryItemDto,
    });
  }

  async deleteLibraryItem(id: number): Promise<LibraryItem> {
    const findLibraryItem: LibraryItem = await this.prisma.libraryItem.findUnique({
      where: { id: id },
    });

    if (!findLibraryItem) {
      throw new HttpException(
        'No library item with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.prisma.libraryItem.delete({
      where: {
        id,
      },
			include: {
        libraryArticle: true,
      },
    });
  }

  async updateLibraryItem(id: number, libraryItemUpdateDto: LibraryItemUpdateDto): Promise<LibraryItem> {
    const findLibraryItem: LibraryItem = await this.prisma.libraryItem.findUnique({
      where: { id: id },
    });

    if (!findLibraryItem) {
      throw new HttpException(
        'No library item with this id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (libraryItemUpdateDto.libraryArticleId) {
      const findLibraryArticle: LibraryArticle = await this.prisma.libraryArticle.findUnique({
        where: { id: libraryItemUpdateDto.libraryArticleId },
      });

      if (!findLibraryArticle) {
        throw new HttpException(
          'No library article with this id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.prisma.libraryItem.update({
      where: {
        id,
      },
			include: {
        libraryArticle: true,
      },
      data: libraryItemUpdateDto,
    });
  }
}
