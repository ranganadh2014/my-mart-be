import { IsNumber, IsString } from "class-validator";

export class PaymentHandlerDto {
    @IsString()
    orderId: string;
    @IsString()
    razorpayPaymentId: string;
    @IsString()
    razorpaySignature: string;
}