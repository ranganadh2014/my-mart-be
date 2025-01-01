-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descrition" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total_supply" INTEGER NOT NULL,
    "available_qty" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
