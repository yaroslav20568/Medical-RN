import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CityDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsInt()
  @ApiProperty({ default: 1 })
  countryId: number;
}

export class CityUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  countryId: number;
}
