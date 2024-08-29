import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

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

	@IsBoolean()
	@ApiProperty({ default: false })
	isRead: boolean;
}