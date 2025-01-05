import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { ProductsModule } from 'src/products/products.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ConfigModule, ProductsModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
