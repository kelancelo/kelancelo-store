-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dateOrdered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;