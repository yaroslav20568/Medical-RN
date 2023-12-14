import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Genders } from 'src/constants';

export class UserDto {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty({ enum: Genders, enumName: 'Genders' })
  gender: string;

  @IsString()
  @ApiProperty()
  typesUsers: string;

  @IsString()
  @ApiProperty()
  city: string;
}

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @ApiProperty({ required: false })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: Genders, enumName: 'Genders', required: false })
  gender: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  typesUsers: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  city: string;
}
