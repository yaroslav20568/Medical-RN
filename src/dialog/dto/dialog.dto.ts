import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class DialogQuery {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  adminId: number;
}

export class DialogDto {
	@IsInt()
  @ApiProperty({ default: 1 })
  userId: number;

  @IsInt()
  @ApiProperty({ default: 0 })
  adminId: number;
}