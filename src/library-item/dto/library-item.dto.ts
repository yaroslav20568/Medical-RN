import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class LibraryItemQuery {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  libraryArticleId: number;
}

export class LibraryItemDto {
  @IsInt()
  @ApiProperty({ default: 1 })
  libraryArticleId: number;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  text: string;
}

export class LibraryItemUpdateDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  libraryArticleId: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  text: string;
}
