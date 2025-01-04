import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }
}
