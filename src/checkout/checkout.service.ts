import { ConsoleLogger, Injectable, InternalServerErrorException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CheckoutService {
private razorpay: Razorpay;

  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
){
    this.razorpay = new Razorpay({
        key_id: configService.getOrThrow('RAZOR_PAY_KEY_ID'),
        key_secret: configService.getOrThrow('RAZOR_PAY_KEY_SECRET'),
      });
}

  async createOrder(prodId: number) {
    console.log(prodId);
    try {
        const product = await this.productsService.getProduct(prodId);
        const session = await this.razorpay.orders.create({ amount: product.price * 100, currency: 'INR', notes: { description: 'Order payment' } });
        return session;
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Failed to create checkout session');        
    }
  }
}
