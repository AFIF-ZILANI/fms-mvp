/*
  Warnings:

  - You are about to drop the column `online_contact` on the `Profiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_avatar_id_fkey";

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "online_contact";

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "Avatars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
