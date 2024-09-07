import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class QuestionResultDto {
  @IsInt()
  @ApiProperty({ default: 1 })
  quizId: number;

	@IsInt()
  @ApiProperty({ default: 1 })
  questionId: number;

	@IsInt()
  @ApiProperty({ default: 1 })
  questionAnswerId: number;

	@IsInt()
  @ApiProperty({ default: 1 })
  userId: number;
}
