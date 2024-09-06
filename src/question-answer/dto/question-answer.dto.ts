import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QuestionAnswerDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsInt()
  @ApiProperty({ default: 1 })
  questionId: number;
}

export class QuestionAnswerUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  questionId: number;
}
