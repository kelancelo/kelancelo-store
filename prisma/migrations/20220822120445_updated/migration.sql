/*
  Warnings:

  - You are about to drop the column `stateOrRegion` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "stateOrRegion",
ADD COLUMN     "stateOrProvince" TEXT;
