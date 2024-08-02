import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Express, diskStorage } from 'multer';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IUser, IUserModific, IUserWithTokens } from 'src/user/types';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  async createUser(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() userDto: UserDto,
  ): Promise<IUserModific> {
    return this.authService.register(file, userDto);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto): Promise<IUserWithTokens> {
    return this.authService.login(loginDto);
  }

  @Post('login/access-token')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto): Promise<IUserWithTokens> {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  @HttpCode(200)
  async auth(@Req() req): Promise<IUser> {
    return this.authService.returnUserFields(
      await this.userService.findOne(req.user.id),
    );
  }
}
