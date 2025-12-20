/*
  Warnings:

  - Added the required column `phase` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Made the column `number` on table `Houses` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Phase" AS ENUM ('BROODER', 'GROWER');

-- AlterTable
ALTER TABLE "Batches" ADD COLUMN     "phase" "Phase" NOT NULL;

-- AlterTable
ALTER TABLE "Houses" ALTER COLUMN "number" SET NOT NULL;
