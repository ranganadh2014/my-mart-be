import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  // Get all Products
  async getProducts() {
    return await this.prismaService.product.findMany();
  }

  // Get Product by product ID
  async getProduct(prodId: string) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: {
          id: prodId
        },
      });
      return product; 
    } catch (error) {
      throw new NotFoundException(`Product with Id ${prodId} Not found`);
    }
  }
}
