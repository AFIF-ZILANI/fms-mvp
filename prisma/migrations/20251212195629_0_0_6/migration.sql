/*
  Warnings:

  - You are about to alter the column `price_per_chicks` on the `BatchSuppliers` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `water_consumed_l` on the `DailyRecords` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `feed_consumed_kg` on the `DailyRecords` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `average_wt_grams` on the `WeightRecords` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[profile_id]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[batch_id,house_id,date]` on the table `WeightRecords` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Houses` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Houses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HouseType" AS ENUM ('BROODER', 'GROWER');

-- DropIndex
DROP INDEX "WeightRecords_batch_id_house_id_age_key";

-- AlterTable
ALTER TABLE "BatchSuppliers" ALTER COLUMN "quality_score" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "price_per_chicks" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "DailyRecords" ALTER COLUMN "water_consumed_l" DROP NOT NULL,
ALTER COLUMN "water_consumed_l" DROP DEFAULT,
ALTER COLUMN "water_consumed_l" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "feed_consumed_kg" DROP DEFAULT,
ALTER COLUMN "feed_consumed_kg" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Houses" ADD COLUMN     "type" "HouseType" NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WeightRecords" ALTER COLUMN "average_wt_grams" SET DATA TYPE DECIMAL(10,2);

-- DropEnum
DROP TYPE "HouseNames";

-- CreateTable
CREATE TABLE "BatchHouseAllocation" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "house_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BatchHouseAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BatchHouseAllocation_batch_id_house_id_idx" ON "BatchHouseAllocation"("batch_id", "house_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_profile_id_key" ON "Employees"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "WeightRecords_batch_id_house_id_date_key" ON "WeightRecords"("batch_id", "house_id", "date");

-- AddForeignKey
ALTER TABLE "BatchHouseAllocation" ADD CONSTRAINT "BatchHouseAllocation_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchHouseAllocation" ADD CONSTRAINT "BatchHouseAllocation_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "Houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
