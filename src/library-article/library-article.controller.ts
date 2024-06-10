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
import { LibraryArticleService } from './library-article.service';
import { ApiTags } from '@nestjs/swagger';
import { LibraryArticle } from '@prisma/client';
import { LibraryArticleDto, LibraryArticleUpdateDto } from './dto/library-article.dto';

@ApiTags('Library-article')
@Controller()
export class LibraryArticleController {
  constructor(private readonly libraryArticleService: LibraryArticleService) {}

  @Get('library-article')
  @HttpCode(200)
  async getLibraryArticles(): Promise<LibraryArticle[]> {
    return this.libraryArticleService.getLibraryArticles();
  }

  @Post('library-article')
  @HttpCode(200)
  async createLibraryArticle(@Body() libraryArticleDto: LibraryArticleDto): Promise<LibraryArticle> {
    return this.libraryArticleService.createLibraryArticle(libraryArticleDto);
  }

  @Delete('library-article/:id')
  @HttpCode(200)
  async deleteLibraryArticle(@Param('id', ParseIntPipe) id: number): Promise<LibraryArticle> {
    return this.libraryArticleService.deleteLibraryArticle(id);
  }

  @Put('library-article/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateLibraryArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() libraryArticleUpdateDto: LibraryArticleUpdateDto,
  ): Promise<LibraryArticle> {
    return this.libraryArticleService.updateLibraryArticle(id, libraryArticleUpdateDto);
  }
}
