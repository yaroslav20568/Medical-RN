import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login/access-token')
  @UsePipes(new ValidationPipe())
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  async me(@Req() req) {
    return this.authService.returnUserFields(
      await this.userService.findOne(req.user.id),
    );
  }
}
