/*
  Warnings:

  - Added the required column `paidVia` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payments" ADD COLUMN     "paidVia" "public"."PaidVia" NOT NULL;
