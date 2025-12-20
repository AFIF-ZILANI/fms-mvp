-- DropForeignKey
ALTER TABLE "Admins" DROP CONSTRAINT "Admins_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
