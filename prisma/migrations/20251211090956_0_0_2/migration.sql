/*
  Warnings:

  - You are about to drop the column `avatar_id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `expected_end_date` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `house_no` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `is_from_registerd_supplier` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `received_quantity` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `is_registered` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `online_contact` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `avarage_weight_grams` on the `DailyRecords` table. All the data in the column will be lost.
  - You are about to drop the column `feed_consumed_bags` on the `DailyRecords` table. All the data in the column will be lost.
  - You are about to drop the column `mortality` on the `DailyRecords` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_id` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `is_registered` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `online_contact` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Pharmacist` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_id` on the `Pharmacist` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Pharmacist` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Pharmacist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Pharmacist` table. All the data in the column will be lost.
  - You are about to drop the column `online_contact` on the `Pharmacist` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_id` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `online_contact` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[batch_id,house_id,date]` on the table `DailyRecords` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `Pharmacist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expected_selling_date` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initial_quantity` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `DailyRecords` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house_id` to the `DailyRecords` table without a default value. This is not possible if the table is not empty.
  - Made the column `water_consumed_l` on table `DailyRecords` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `profile_id` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `Pharmacist` table without a default value. This is not possible if the table is not empty.
  - Made the column `batch_id` on table `Sales` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `profile_id` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "DailyRecords" DROP CONSTRAINT "DailyRecords_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "Pharmacist" DROP CONSTRAINT "Pharmacist_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_avatar_id_fkey";

-- DropIndex
DROP INDEX "Admin_avatar_id_key";

-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "Customer_avatar_id_key";

-- DropIndex
DROP INDEX "Customer_email_key";

-- DropIndex
DROP INDEX "DailyRecords_date_key";

-- DropIndex
DROP INDEX "Doctor_avatar_id_key";

-- DropIndex
DROP INDEX "Doctor_email_key";

-- DropIndex
DROP INDEX "Pharmacist_avatar_id_key";

-- DropIndex
DROP INDEX "Pharmacist_email_key";

-- DropIndex
DROP INDEX "Supplier_avatar_id_key";

-- DropIndex
DROP INDEX "Supplier_email_key";

-- DropIndex
DROP INDEX "Supplier_name_idx";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "avatar_id",
DROP COLUMN "email",
DROP COLUMN "mobile",
DROP COLUMN "name",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "expected_end_date",
DROP COLUMN "house_no",
DROP COLUMN "is_from_registerd_supplier",
DROP COLUMN "received_quantity",
DROP COLUMN "start_date",
ADD COLUMN     "expected_selling_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "initial_quantity" INTEGER NOT NULL,
ADD COLUMN     "starting_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "address",
DROP COLUMN "avatar_id",
DROP COLUMN "email",
DROP COLUMN "is_registered",
DROP COLUMN "mobile",
DROP COLUMN "name",
DROP COLUMN "online_contact",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DailyRecords" DROP COLUMN "avarage_weight_grams",
DROP COLUMN "feed_consumed_bags",
DROP COLUMN "mortality",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "feed_consumed_kg" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "house_id" INTEGER NOT NULL,
ADD COLUMN     "mortality_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mortality_reason" TEXT,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "water_consumed_l" SET NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "address",
DROP COLUMN "avatar_id",
DROP COLUMN "email",
DROP COLUMN "is_registered",
DROP COLUMN "mobile",
DROP COLUMN "name",
DROP COLUMN "online_contact",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pharmacist" DROP COLUMN "address",
DROP COLUMN "avatar_id",
DROP COLUMN "email",
DROP COLUMN "mobile",
DROP COLUMN "name",
DROP COLUMN "online_contact",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "batch_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "address",
DROP COLUMN "avatar_id",
DROP COLUMN "email",
DROP COLUMN "mobile",
DROP COLUMN "name",
DROP COLUMN "online_contact",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Images";

-- CreateTable
CREATE TABLE "BatchSupplier" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "quality_score" INTEGER NOT NULL,

    CONSTRAINT "BatchSupplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightRecords" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "house_id" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "average_wt_grams" DOUBLE PRECISION NOT NULL,
    "sample_size" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeightRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Houses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Houses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "avatar_id" TEXT NOT NULL,
    "online_contact" "ContactMethod"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "role" "EmployeeRoleName" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatars" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avatars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BatchSupplier_batch_id_supplier_id_key" ON "BatchSupplier"("batch_id", "supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "WeightRecords_batch_id_house_id_age_key" ON "WeightRecords"("batch_id", "house_id", "age");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_email_key" ON "Profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_profile_id_key" ON "Admin"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_profile_id_key" ON "Customer"("profile_id");

-- CreateIndex
CREATE INDEX "DailyRecords_batch_id_house_id_age_idx" ON "DailyRecords"("batch_id", "house_id", "age");

-- CreateIndex
CREATE UNIQUE INDEX "DailyRecords_batch_id_house_id_date_key" ON "DailyRecords"("batch_id", "house_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_profile_id_key" ON "Doctor"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacist_profile_id_key" ON "Pharmacist"("profile_id");

-- CreateIndex
CREATE INDEX "SalesItem_sale_id_item_id_idx" ON "SalesItem"("sale_id", "item_id");

-- CreateIndex
CREATE INDEX "StockTransaction_item_id_batch_id_idx" ON "StockTransaction"("item_id", "batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_profile_id_key" ON "Supplier"("profile_id");

-- AddForeignKey
ALTER TABLE "BatchSupplier" ADD CONSTRAINT "BatchSupplier_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchSupplier" ADD CONSTRAINT "BatchSupplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRecords" ADD CONSTRAINT "DailyRecords_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRecords" ADD CONSTRAINT "DailyRecords_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "Houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecords" ADD CONSTRAINT "WeightRecords_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecords" ADD CONSTRAINT "WeightRecords_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "Houses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_avatar_id_fkey" FOREIGN KEY ("avatar_id") REFERENCES "Avatars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pharmacist" ADD CONSTRAINT "Pharmacist_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
