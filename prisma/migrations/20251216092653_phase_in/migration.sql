/*
  Warnings:

  - Added the required column `phase` to the `Batches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batches" ADD COLUMN     "phase" "Phase" NOT NULL;
