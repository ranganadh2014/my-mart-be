import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  prodId: string;
}