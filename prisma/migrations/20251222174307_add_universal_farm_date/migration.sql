/*
  Warnings:

  - You are about to drop the column `age` on the `WeightRecords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alerts" ADD COLUMN     "issued_at" DATE,
ALTER COLUMN "resolved_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "EnvironmentRecords" ADD COLUMN     "farm_date" DATE;

-- AlterTable
ALTER TABLE "HouseEvents" ADD COLUMN     "farm_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Medications" ADD COLUMN     "farm_date" DATE;

-- AlterTable
ALTER TABLE "Vaccinations" ADD COLUMN     "farm_date" DATE;

-- AlterTable
ALTER TABLE "WeightRecords" DROP COLUMN "age",
ADD COLUMN     "farm_date" DATE;
