/*
  Warnings:

  - You are about to drop the column `dateTime` on the `meals` table. All the data in the column will be lost.
  - Added the required column `date_time` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "dateTime",
ADD COLUMN     "date_time" TIMESTAMP(3) NOT NULL;
