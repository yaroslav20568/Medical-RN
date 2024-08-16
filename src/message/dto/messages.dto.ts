import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class MessageDto {
	@IsString()
  @ApiProperty()
  time: string;

	@IsString()
  @ApiProperty()
  text: string;

	@IsInt()
  @ApiProperty({ default: 1 })
  userId: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  dialogId: number;
}