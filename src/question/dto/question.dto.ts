import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  @ApiProperty()
  name: string;
}
