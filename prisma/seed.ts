import { PrismaClient } from '@prisma/client';
import { products } from '../data/products-dataset';

//get the prisma client
const prisma = new PrismaClient();

async function loadProducts() {
  //read data from dataset
  await prisma.product.createMany({
    data: products,
  });
} 

loadProducts()
  .catch((error) => {
    console.log(error);
    process.exit(-1);
})
  .finally();
