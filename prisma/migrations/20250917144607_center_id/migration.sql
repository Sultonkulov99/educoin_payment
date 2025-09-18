/*
  Warnings:

  - You are about to drop the column `center_id` on the `payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_center_id_fkey";

-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "center_id",
ADD COLUMN     "centerId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
