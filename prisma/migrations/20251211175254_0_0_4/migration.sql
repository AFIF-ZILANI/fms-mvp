/*
  Warnings:

  - You are about to drop the column `supplier_id` on the `Batches` table. All the data in the column will be lost.
  - Added the required column `init_chicks_avg_wt` to the `Batches` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Houses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HouseNames" AS ENUM ('BROODER', 'GROWER');

-- AlterTable
ALTER TABLE "Batches" DROP COLUMN "supplier_id",
ADD COLUMN     "init_chicks_avg_wt" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Houses" DROP COLUMN "name",
ADD COLUMN     "name" "HouseNames" NOT NULL;
