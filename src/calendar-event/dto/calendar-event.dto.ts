import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { TypesEvents } from 'src/constants';

export class CalendarEventQuery {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  userId: number;
}

export class CalendarEventDto {
  @IsString()
  @ApiProperty()
  name: string;

	@IsInt()
  @ApiProperty({ default: 1 })
  userId: number;

	@IsString()
  @ApiProperty({ enum: TypesEvents, enumName: 'TypesEvents' })
  typeEvent: string;

	@IsString()
  @ApiProperty()
  dateEvent: string;
}

export class CalendarEventUpdateDto {
  @IsString()
	@IsOptional()
  @ApiProperty({ required: false })
  name: string;

	@IsInt()
  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  userId: number;

	@IsString()
	@IsOptional()
  @ApiProperty({ enum: TypesEvents, enumName: 'TypesEvents', required: false })
  typeEvent: string;

	@IsString()
	@IsOptional()
  @ApiProperty({ required: false })
  dateEvent: string;
}
