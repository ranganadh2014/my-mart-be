import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  // Protected route. Handled by Passport JWT strategy
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  // Protected route. Handled by Passport JWT strategy
  @UseGuards(JwtAuthGuard)
  @Get(':prodId')
  async getProduct(@Param('prodId') prodId: string) {
    return this.productsService.getProduct(prodId);
  }
}
