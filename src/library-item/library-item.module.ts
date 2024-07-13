import { Module } from '@nestjs/common';
import { LibraryItemService } from './library-item.service';
import { LibraryItemController } from './library-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LibraryItemController],
  providers: [LibraryItemService, PrismaService],
})
export class ArticleItemModule {}
