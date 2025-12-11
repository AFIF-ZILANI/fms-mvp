/*
  Warnings:

  - The `online_contact` column on the `Profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Batch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BatchSupplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Environment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pharmacist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vaccination` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `Employees` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `unit` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Expenses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EmployeeRoleNames" AS ENUM ('MANAGER', 'WORKER', 'INTERN');

-- CreateEnum
CREATE TYPE "ContactMethods" AS ENUM ('WHATSAPP', 'EMAIL', 'IMO', 'TELEGRAM');

-- CreateEnum
CREATE TYPE "SupplierRoleNames" AS ENUM ('SALES_MAN', 'OWNER', 'DISTRIBUTOR', 'DEALER', 'WHOLESALER', 'RETAILER', 'MANUFACTURER', 'IMPORTER', 'REPRESENTATIVE');

-- CreateEnum
CREATE TYPE "TransactionTypes" AS ENUM ('PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT', 'DAMAGE');

-- CreateEnum
CREATE TYPE "Units" AS ENUM ('BIRD', 'KG', 'LITER', 'BAG', 'BOX', 'UNIT', 'OTHER');

-- CreateEnum
CREATE TYPE "TimePeriods" AS ENUM ('MORNING', 'NOON', 'AFTERNOON', 'EVENING', 'NIGHT', 'MIDNIGHT', 'LATENIGHT');

-- CreateEnum
CREATE TYPE "BirdBreeds" AS ENUM ('CLASSIC', 'HIBREED', 'PAKISTHANI', 'KEDERNATH', 'FAOMI', 'TIGER');

-- CreateEnum
CREATE TYPE "ResourceCategories" AS ENUM ('FEED', 'MEDICINE', 'CHICKS', 'HUSK', 'EQUIPMENT', 'UTILITIES', 'SALARY', 'TRANSPORTATION', 'MAINTENANCE', 'CLEANING_SUPPLIES', 'OTHER');

-- CreateEnum
CREATE TYPE "SupplierSupplyCategories" AS ENUM ('FEED', 'MEDICINE', 'CHICKS', 'HUSK', 'EQUIPMENT', 'UTILITIES', 'TRANSPORTATION', 'CLEANING_SUPPLIES', 'OFFICE_SUPPLIES', 'SOFTWARE', 'OTHER');

-- CreateEnum
CREATE TYPE "AlertTypes" AS ENUM ('EMPLOYEE', 'BATCH', 'FEED', 'MEDICINE', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AlertLevels" AS ENUM ('INFO', 'WARNING', 'CRITICAL');

-- CreateEnum
CREATE TYPE "AlertActionTypes" AS ENUM ('PAY', 'REASSIGN', 'MARK_RESOLVED');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "BatchSupplier" DROP CONSTRAINT "BatchSupplier_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "BatchSupplier" DROP CONSTRAINT "BatchSupplier_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "DailyRecords" DROP CONSTRAINT "DailyRecords_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "Medications" DROP CONSTRAINT "Medications_administered_by_fkey";

-- DropForeignKey
ALTER TABLE "Medications" DROP CONSTRAINT "Medications_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Medications" DROP CONSTRAINT "Medications_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Pharmacist" DROP CONSTRAINT "Pharmacist_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "SalesItem" DROP CONSTRAINT "SalesItem_item_id_fkey";

-- DropForeignKey
ALTER TABLE "SalesItem" DROP CONSTRAINT "SalesItem_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "StockTransaction" DROP CONSTRAINT "StockTransaction_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "StockTransaction" DROP CONSTRAINT "StockTransaction_item_id_fkey";

-- DropForeignKey
ALTER TABLE "StockTransaction" DROP CONSTRAINT "StockTransaction_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Vaccination" DROP CONSTRAINT "Vaccination_administered_by_fkey";

-- DropForeignKey
ALTER TABLE "Vaccination" DROP CONSTRAINT "Vaccination_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Vaccination" DROP CONSTRAINT "Vaccination_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "WeightRecords" DROP CONSTRAINT "WeightRecords_batch_id_fkey";

-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "role",
ADD COLUMN     "role" "EmployeeRoleNames" NOT NULL;

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "unit",
ADD COLUMN     "unit" "Units" NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "ResourceCategories" NOT NULL;

-- AlterTable
ALTER TABLE "Profiles" DROP COLUMN "online_contact",
ADD COLUMN     "online_contact" "ContactMethods"[];

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Alert";

-- DropTable
DROP TABLE "Batch";

-- DropTable
DROP TABLE "BatchSupplier";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Doctor";

-- DropTable
DROP TABLE "Environment";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Pharmacist";

-- DropTable
DROP TABLE "SalesItem";

-- DropTable
DROP TABLE "StockTransaction";

-- DropTable
DROP TABLE "Supplier";

-- DropTable
DROP TABLE "Vaccination";

-- DropEnum
DROP TYPE "AlertActionType";

-- DropEnum
DROP TYPE "AlertLevel";

-- DropEnum
DROP TYPE "AlertType";

-- DropEnum
DROP TYPE "BirdBreed";

-- DropEnum
DROP TYPE "ContactMethod";

-- DropEnum
DROP TYPE "EmployeeRoleName";

-- DropEnum
DROP TYPE "ResourceCategory";

-- DropEnum
DROP TYPE "SupplierRoleName";

-- DropEnum
DROP TYPE "SupplierSupplyCategory";

-- DropEnum
DROP TYPE "TimePeriod";

-- DropEnum
DROP TYPE "TransactionType";

-- DropEnum
DROP TYPE "Unit";

-- CreateTable
CREATE TABLE "Batches" (
    "id" TEXT NOT NULL,
    "starting_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expected_selling_date" TIMESTAMP(3) NOT NULL,
    "initial_quantity" INTEGER NOT NULL,
    "supplier_id" TEXT,
    "breed" "BirdBreeds" NOT NULL,
    "batch_id" TEXT NOT NULL,
    "farm_code" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "sector_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchSuppliers" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "quality_score" INTEGER NOT NULL,

    CONSTRAINT "BatchSuppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "company" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "role" "SupplierRoleNames" NOT NULL,
    "type" "SupplierSupplyCategories"[],
    "company" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctors" (
    "id" TEXT NOT NULL,
    "specialty" TEXT,
    "position" TEXT,
    "degrees" TEXT[],
    "rating" DOUBLE PRECISION DEFAULT 0,
    "sector" TEXT,
    "institution" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pharmacists" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "institution" TEXT,
    "is_registered" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "Pharmacists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTransactions" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "transaction_type" "TransactionTypes" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "supplier_id" TEXT,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "ResourceCategories" NOT NULL,
    "unit_name" "Units" NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,
    "reorder_level" INTEGER NOT NULL DEFAULT 0,
    "is_consumable" BOOLEAN NOT NULL DEFAULT true,
    "supplier_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesItems" (
    "id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SalesItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccinations" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vaccine_details" TEXT,
    "administered_by" TEXT NOT NULL,
    "vaccine_name" TEXT NOT NULL,
    "dosage" INTEGER NOT NULL,
    "cause" TEXT,
    "period" TEXT,
    "doctor_id" TEXT,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vaccinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnvironmentRecords" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "house_no" INTEGER NOT NULL,
    "temperature_c" DOUBLE PRECISION NOT NULL,
    "humidity_percent" DOUBLE PRECISION NOT NULL,
    "ammonia_ppm" DOUBLE PRECISION NOT NULL,
    "co2_ppm" DOUBLE PRECISION NOT NULL,
    "air_pressure_hpa" DOUBLE PRECISION NOT NULL,
    "time_period" "TimePeriods" NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnvironmentRecords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "AlertTypes" NOT NULL,
    "level" "AlertLevels" NOT NULL,
    "status" "AlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "related_id" TEXT,
    "action_type" "AlertActionTypes",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Batches_batch_id_key" ON "Batches"("batch_id");

-- CreateIndex
CREATE INDEX "Batches_farm_code_sector_code_product_code_batch_id_idx" ON "Batches"("farm_code", "sector_code", "product_code", "batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "BatchSuppliers_batch_id_supplier_id_key" ON "BatchSuppliers"("batch_id", "supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_profile_id_key" ON "Admins"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_profile_id_key" ON "Customers"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_profile_id_key" ON "Suppliers"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_profile_id_key" ON "Doctors"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacists_profile_id_key" ON "Pharmacists"("profile_id");

-- CreateIndex
CREATE INDEX "StockTransactions_item_id_batch_id_idx" ON "StockTransactions"("item_id", "batch_id");

-- CreateIndex
CREATE INDEX "SalesItems_sale_id_item_id_idx" ON "SalesItems"("sale_id", "item_id");

-- AddForeignKey
ALTER TABLE "BatchSuppliers" ADD CONSTRAINT "BatchSuppliers_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchSuppliers" ADD CONSTRAINT "BatchSuppliers_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRecords" ADD CONSTRAINT "DailyRecords_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightRecords" ADD CONSTRAINT "WeightRecords_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pharmacists" ADD CONSTRAINT "Pharmacists_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransactions" ADD CONSTRAINT "StockTransactions_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransactions" ADD CONSTRAINT "StockTransactions_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransactions" ADD CONSTRAINT "StockTransactions_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesItems" ADD CONSTRAINT "SalesItems_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesItems" ADD CONSTRAINT "SalesItems_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medications" ADD CONSTRAINT "Medications_administered_by_fkey" FOREIGN KEY ("administered_by") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medications" ADD CONSTRAINT "Medications_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medications" ADD CONSTRAINT "Medications_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccinations" ADD CONSTRAINT "Vaccinations_administered_by_fkey" FOREIGN KEY ("administered_by") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccinations" ADD CONSTRAINT "Vaccinations_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccinations" ADD CONSTRAINT "Vaccinations_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnvironmentRecords" ADD CONSTRAINT "EnvironmentRecords_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
