import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class HotlineQuery {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  skip: number;
}

export class HotlineDto {
	@IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  name: string;

	@IsString()
  @ApiProperty()
  phone: string;

	@IsString()
  @ApiProperty()
  services: string;

	@IsString()
  @ApiProperty()
  addInfo: string;

	@IsString()
  @ApiProperty()
  typesUsers: string;
}

export class HotlineUpdateDto {
	@IsString()
	@IsOptional()
  @ApiProperty()
  type: string;

  @IsString()
	@IsOptional()
  @ApiProperty()
  name: string;

	@IsString()
	@IsOptional()
  @ApiProperty()
  phone: string;

	@IsString()
	@IsOptional()
  @ApiProperty()
  services: string;

	@IsString()
	@IsOptional()
  @ApiProperty()
  addInfo: string;

	@IsString()
	@IsOptional()
  @ApiProperty()
  typesUsers: string;
}