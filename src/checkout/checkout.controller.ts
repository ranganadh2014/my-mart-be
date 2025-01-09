import { Controller, UseGuards, Post, Body, Header, Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CheckoutService } from './checkout.service';
import { PaymentHandlerDto } from './dtos/payment-handler.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('order')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() request: CreateOrderDto,
    @GetUser() user: TokenPayload,
  ) {
    return this.checkoutService.createOrder(request.prodId, user.userId);
  }

  @Post('webhook')
  async handleCheckoutWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Body() eventBody: any,
  ) {
    return this.checkoutService.handleCheckoutWebhook(signature, eventBody);
  }

  @Post('payment')
  @UseGuards(JwtAuthGuard)
  async paymentHandler(@Body() data: PaymentHandlerDto) {
    return this.checkoutService.paymentHandler(data);
  }
}
