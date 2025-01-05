import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private readonly prismaService: PrismaService){}

    async getOrders(userId: number) : Promise<Order[]>  {
        return await this.prismaService.order.findMany({
            where: {
                userId
            }
        });
    }

    async createOrder(data: Omit<Order, 'id' | 'createdAt'>) : Promise<Order> {
        return await this.prismaService.order.create({data})
    }

    async updateOrder(rpOrderId: string, data: Omit<Order, 'id' | 'createdAt'>) {
        return await this.prismaService.order.update({
            where: {rpOrderId},
            data,
        })
    }
}
