-- DropIndex
DROP INDEX "CartItem_customerId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY ("customerId", "productId");
