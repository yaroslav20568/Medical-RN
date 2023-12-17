import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
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
