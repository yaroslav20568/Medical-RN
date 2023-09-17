import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TypeDto {
  @IsString()
  @ApiProperty()
  name: string;
}
