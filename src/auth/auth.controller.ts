import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/registerDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: registerDto) {
    return this.authService.register(dto);
  }

  // @HttpCode(200)
  // @Post('login')
  // async login(@Body() dto: registerDto) {
  //   // return this.authService.login(dto);
  // }
}
