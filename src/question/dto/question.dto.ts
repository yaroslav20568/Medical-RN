import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QuestionQuery {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  userId: number;
}

export class QuestionDto {
  @IsString()
  @ApiProperty()
  name: string;
}
