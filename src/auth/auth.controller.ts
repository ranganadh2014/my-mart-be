import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){};

  // Uses Passport Local strategy to validate user credentials
  // and add user object to request object
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // GetUser() decorator get user from request execution context
  login(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    //get the JWT object & create token
    return this.authService.login(user, response);
  }
}
