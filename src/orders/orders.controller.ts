import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getOrders(@GetUser() user: TokenPayload) {
    return this.ordersService.getOrders(user.userId);
  }
}
