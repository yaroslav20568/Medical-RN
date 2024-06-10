import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class LibraryArticleDto {
  @IsString()
  @ApiProperty()
  name: string;

	@IsInt()
  @ApiProperty({ default: 0 })
  parent: number;
}

export class LibraryArticleUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 0, required: false })
  parent: number;
}
