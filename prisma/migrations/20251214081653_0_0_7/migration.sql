-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('RUNNING', 'SOLD');

-- AlterTable
ALTER TABLE "Batches" ADD COLUMN     "status" "BatchStatus" NOT NULL DEFAULT 'RUNNING';
