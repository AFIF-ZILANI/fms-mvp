/*
  Warnings:

  - Made the column `farm_date` on table `HouseEvents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `farm_date` on table `WeightRecords` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HouseEvents" ALTER COLUMN "farm_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "WeightRecords" ALTER COLUMN "farm_date" SET NOT NULL;
