import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('order')
  @UseGuards(JwtAuthGuard)
  async createSession(@Body() request: CreateOrderDto) {
    return this.checkoutService.createOrder(request.prodId);
  }
}
