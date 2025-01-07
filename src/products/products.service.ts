import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProducts() {
    return await this.prismaService.product.findMany();
  }

  async getProduct(prodId: number) {
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
