/*
  Warnings:

  - Added the required column `measured_by_id` to the `WeightRecords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeightRecords" ADD COLUMN     "measured_by_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WeightRecords" ADD CONSTRAINT "WeightRecords_measured_by_id_fkey" FOREIGN KEY ("measured_by_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
