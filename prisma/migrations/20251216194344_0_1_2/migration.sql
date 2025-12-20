/*
  Warnings:

  - You are about to drop the `DailyRecords` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EMPLOYEE', 'CUSTOMER', 'SUPPLIER', 'PHARMACIST', 'DOCTOR');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('FEED', 'WATER', 'MORTALITY');

-- DropForeignKey
ALTER TABLE "DailyRecords" DROP CONSTRAINT "DailyRecords_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "DailyRecords" DROP CONSTRAINT "DailyRecords_house_id_fkey";

-- DropForeignKey
ALTER TABLE "WeightRecords" DROP CONSTRAINT "WeightRecords_batch_id_fkey";

-- AlterTable
ALTER TABLE "Profiles" ADD COLUMN     "role" "UserRole" NOT NULL;

-- AlterTable
ALTER TABLE "WeightRecords" ALTER COLUMN "batch_id" DROP NOT NULL;

-- DropTable
DROP TABLE "DailyRecords";

-- CreateTable
CREATE TABLE "HouseEvents" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT,
    "house_id" INTEGER NOT NULL,
    "eventType" "EventType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "Units" NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "HouseEvents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HouseEvents" ADD CONSTRAINT "HouseEvents_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseEvents" ADD CONSTRAINT "HouseEvents_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "Houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseEvents" ADD CONSTRAINT "HouseEvents_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecords" ADD CONSTRAINT "WeightRecords_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
