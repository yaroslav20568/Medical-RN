import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QuizDto {
  @IsString()
  @ApiProperty()
  name: string;
}
