import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ required: false })
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  @ApiProperty({ required: false })
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({ required: false })
  refreshToken: string;
}
