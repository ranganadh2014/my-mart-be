import { Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService){}

  // Method to create new user. Dto filters, validates, transforms input data
  async createUser(data: CreateUserDto){
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          id: true,
          email: true,
        }
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UnprocessableEntityException('Email already exists');
        }
      }
      // Log the error for debugging
      // TODO: use logger module to log errors
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }

  }

  // Method to get the user with user ID & other attributes
  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
