import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){};

  // Handling POST request for creating new User. 
  // Dto filters, validates, transforms input data
  @Post()
  createUser(@Body() request: CreateUserDto) {
    return this.usersService.createUser(request);
  }
}
