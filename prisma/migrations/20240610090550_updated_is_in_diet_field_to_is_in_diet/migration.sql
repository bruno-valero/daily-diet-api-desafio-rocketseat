/*
  Warnings:

  - You are about to drop the column `isInDiet` on the `meals` table. All the data in the column will be lost.
  - Added the required column `is_in_diet` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "isInDiet",
ADD COLUMN     "is_in_diet" BOOLEAN NOT NULL;
