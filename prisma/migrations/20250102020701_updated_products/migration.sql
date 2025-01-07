/*
  Warnings:

  - You are about to drop the column `descrition` on the `Product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "descrition",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;
