import { Module } from '@nestjs/common';
import { LibraryArticleService } from './library-article.service';
import { LibraryArticleController } from './library-article.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LibraryArticleController],
  providers: [LibraryArticleService, PrismaService],
})
export class LibraryArticleModule {}
