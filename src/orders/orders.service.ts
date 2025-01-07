import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrders(userId: number): Promise<Order[]> {
    return await this.prismaService.order.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            name: true, // Select only the product name
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order
      },
    });
  }

  async createOrder(
    data: Omit<Order, 'id' | 'createdAt' | 'rpPaymentId'>,
  ): Promise<Order> {
    return await this.prismaService.order.create({ data });
  }

  async updateOrder(rpOrderId: string, razorpayPaymentId: string) {
    return await this.prismaService.order.update({
      where: { rpOrderId },
      data: {
        rpPaymentId: razorpayPaymentId,
      },
    });
  }
}
