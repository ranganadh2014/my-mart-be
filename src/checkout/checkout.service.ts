import { ConsoleLogger, Injectable, InternalServerErrorException, Inject, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Razorpay from 'razorpay';
import { ProductsService } from 'src/products/products.service';
import crypto from 'crypto';
import { OrdersService } from 'src/orders/orders.service';

interface PaymentInfo {
      orderId: string,
      razorpayPaymentId: string,
      razorpaySignature: string,
}

@Injectable()
export class CheckoutService {
private razorpay: Razorpay;

  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
    private readonly ordersService: OrdersService,
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
        const order = await this.razorpay.orders.create({ amount: product.price * 100, currency: 'INR', notes: { description: 'Order payment' } });
        //create new order in the db
        return order;
    } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Failed to create checkout session');        
    }
  }

  async handleCheckoutWebhook(signature: string, body: any) {
    //TODO: implement webhook handler
    // try {
    //   // get the signature from header
    //   const inComingSignature = 
    //   req.headers['x-razorpay-signature'];
    //   // create the hash
    //   const shasum = 
    //   crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
    //   shasum.update(JSON.stringify(req.body));
    //   const freshSignature = shasum.digest('hex');
    //   if (freshSignature === inComingSignature) {
    //       console.log("Signature is valid");
    //       // do the further processing
    //       const order_id=req.body.payload.payment.entity.order_id;
    //       console.log("order_id",order_id);
    //       console.log("event",req.body.event);

    //       res.status(200).json({ message: "OK" });
    //   } else {
    //       // there some tempering 
    //       res.status(403).json({ message: "Invalid" });
    //   }

    // } catch (err) {
    //   console.log(err);
    //   res.status(500).send("Something went wrong");
    // }    
    console.log(body);
  }

  async paymentHandler(data: PaymentInfo) {
    console.log(data);
    //generate signature
    const generatedSignature = crypto
    .createHmac("sha256", this.configService.getOrThrow('RAZOR_PAY_KEY_SECRET'))
    .update(data.orderId + "|" + data.razorpayPaymentId)
    .digest("hex");
    if (generatedSignature !== data.razorpaySignature) {
      //TODO: update order payment status in db
      throw new UnprocessableEntityException("Payment failed");
    }
    //Update paymentId in the order db
    return {message: "Payment success"};
  }
}
