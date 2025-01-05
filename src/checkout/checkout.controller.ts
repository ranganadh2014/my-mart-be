import { Controller, UseGuards, Post, Body, Header, Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CheckoutService } from './checkout.service';
import { PaymentHandlerDto } from './dtos/payment-handler.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('order')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderDto) {
    return this.checkoutService.createOrder(request.prodId);
  }

  @Post('webhook')
  async handleCheckoutWebhook(@Headers('x-razorpay-signature') signature: string, @Body() eventBody: any) {
    return this.checkoutService.handleCheckoutWebhook(signature, eventBody);
  }

  @Post('payment')
  @UseGuards(JwtAuthGuard)
  async paymentHandler(@Body() data: PaymentHandlerDto) {
    return this.checkoutService.paymentHandler(data);
  }
}
