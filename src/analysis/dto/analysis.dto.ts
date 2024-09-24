import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Analyzes } from 'src/constants';

export class AnalysisQuery {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  userId: number;
}

export class AnalysisDto {
  @IsString()
  @ApiProperty()
  name: string;

	@IsInt()
  @ApiProperty({ default: 1 })
  userId: number;

	@IsString()
  @ApiProperty({ enum: Analyzes, enumName: 'Analyzes' })
  category: string;

	@IsString()
  @ApiProperty()
  photo: string;
}

export class AnalysisUpdateDto {
  @IsString()
	@IsOptional()
  @ApiProperty({ required: false })
  name: string;

	@IsInt()
  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  userId: number;

	@IsString()
	@IsOptional()
  @ApiProperty({ enum: Analyzes, enumName: 'Analyzes', required: false })
  category: string;

	@IsString()
	@IsOptional()
  @ApiProperty({ required: false })
  photo: string;
}
