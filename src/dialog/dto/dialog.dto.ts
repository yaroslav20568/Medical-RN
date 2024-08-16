import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DialogDto {
	@IsInt()
  @ApiProperty({ default: 1 })
  userId: number;

  @IsInt()
  @ApiProperty({ default: 0 })
  adminId: number;
}