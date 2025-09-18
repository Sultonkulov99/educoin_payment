/*
  Warnings:

  - You are about to drop the column `end_date` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `payments` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PaidVia" AS ENUM ('PAYME', 'CLICK', 'CASH');

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "end_date",
DROP COLUMN "start_date",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "paidAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."transactions" (
    "id" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "perform_time" TIMESTAMP(3),
    "create_time" TIMESTAMP(3),
    "cancel_time" TIMESTAMP(3),
    "state" INTEGER NOT NULL,
    "reason" INTEGER,
    "centerId" INTEGER,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_pid_key" ON "public"."transactions"("pid");

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "public"."transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
