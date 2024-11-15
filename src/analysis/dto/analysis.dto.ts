import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Express } from 'multer';
import { Analyzes } from 'src/constants';

export class AnalysisQuery {
	@IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  skip: number;

  @IsInt()
  @ApiProperty({ required: true })
  userId: number;
}

export class AnalysisDto {
  @IsString()
  @ApiProperty()
  name: string;

	@IsInt()
	@Transform(({ value }) => parseInt(value))
  @ApiProperty({ default: 1 })
  userId: number;

	@IsString()
  @ApiProperty({ enum: Analyzes, enumName: 'Analyzes' })
  category: string;

	@ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.multer.file;

	@IsString()
  @ApiProperty()
  date: string;
}

export class AnalysisUpdateDto {
  @IsString()
	@IsOptional()
  @ApiProperty({ required: false })
  name: string;

	@IsInt()
  @IsOptional()
	@Transform(({ value }) => parseInt(value))
  @ApiProperty({ default: 1, required: false })
  userId: number;

	@IsString()
	@IsOptional()
  @ApiProperty({ enum: Analyzes, enumName: 'Analyzes', required: false })
  category: string;

	@ApiProperty({ type: 'string', format: 'binary', required: false })
  file: Express.multer.file;

	@IsString()
  @ApiProperty()
  date: string;
}
