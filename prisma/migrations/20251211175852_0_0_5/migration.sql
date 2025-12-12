/*
  Warnings:

  - Added the required column `price_per_chicks` to the `BatchSuppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BatchSuppliers" ADD COLUMN     "price_per_chicks" DOUBLE PRECISION NOT NULL;
