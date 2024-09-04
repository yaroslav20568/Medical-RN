import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsInt()
  @ApiProperty({ default: 1 })
  quizId: number;
}

export class QuestionUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  quizId: number;
}
