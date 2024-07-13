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
import { LibraryItemService } from './library-item.service';
import { ApiTags } from '@nestjs/swagger';
import { LibraryItemDto, LibraryItemUpdateDto } from './dto/library-item.dto';
import { LibraryItem } from '@prisma/client';

@ApiTags('Library-item')
@Controller()
export class LibraryItemController {
  constructor(private readonly libraryItemService: LibraryItemService) {}

  @Get('library-items/:id')
  @HttpCode(200)
  getLibraryItems(@Param('id', ParseIntPipe) libraryArticleId: number): Promise<LibraryItem[]> {
    return this.libraryItemService.getLibraryItems(libraryArticleId);
  }

  @Post('library-item')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  createLibraryItem(@Body() libraryItemDto: LibraryItemDto): Promise<LibraryItem> {
    return this.libraryItemService.createLibraryItem(libraryItemDto);
  }

  @Delete('library-item/:id')
  @HttpCode(200)
  async deleteLibraryItem(@Param('id', ParseIntPipe) id: number): Promise<LibraryItem> {
    return this.libraryItemService.deleteLibraryItem(id);
  }

  @Put('library-item/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async updateLibraryItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() libraryItemDto: LibraryItemUpdateDto,
  ): Promise<LibraryItem> {
    return this.libraryItemService.updateLibraryItem(id, libraryItemDto);
  }
}
