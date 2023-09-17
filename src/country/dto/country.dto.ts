import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  @ApiProperty()
  name: string;
}
