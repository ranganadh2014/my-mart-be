import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  
  async verifyUser(email: string, password: string) {
    // get the user details from DB and verify signature
    try {
      const user = await this.usersService.getUser({ email });
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (!isAuthenticated) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async login(user: User, response: Response) {
    const expiryDuration =
      this.configService.getOrThrow<string>('JWT_EXPIRATION');
    console.log(`Expiry Duration: ${expiryDuration}`);

    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + ms(expiryDuration));

    //prepare payload
    const tokenPayload: TokenPayload = {
      userId: user.id,
    }
    //sign the payload
    const token = await this.jwtService.sign(tokenPayload);
    //save token in response cookies
    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires,
    });
    return { tokenPayload };
  }

}
