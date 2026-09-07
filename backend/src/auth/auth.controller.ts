import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, user } = await this.authService.login(dto);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    return {
      message: 'Login successful',
      user,
    };
  }

  @Post('register')
  registerNewUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() request: { user: User }): User {
    return this.authService.getMe(request.user);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return {
      message: 'Logout successful',
    };
  }
}
