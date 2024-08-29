import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class HotlineDto {
	@IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  name: string;

	@IsString()
  @ApiProperty()
  number: string;

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
  number: string;

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