/*
  Warnings:

  - You are about to drop the column `createdById` on the `HouseEvents` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `HouseEvents` table. All the data in the column will be lost.
  - You are about to drop the column `occurredAt` on the `HouseEvents` table. All the data in the column will be lost.
  - Added the required column `created_by_id` to the `HouseEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_type` to the `HouseEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occurred_at` to the `HouseEvents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "HouseEvents" DROP CONSTRAINT "HouseEvents_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_avatar_id_fkey";

-- AlterTable
ALTER TABLE "HouseEvents" DROP COLUMN "createdById",
DROP COLUMN "eventType",
DROP COLUMN "occurredAt",
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "event_type" "EventType" NOT NULL,
ADD COLUMN     "occurred_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Profiles" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "avatar_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HouseEvents" ADD CONSTRAINT "HouseEvents_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "Avatars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
