/*
  Warnings:

  - You are about to drop the column `photos` on the `Itinerary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "photos",
ADD COLUMN     "coverPhoto" TEXT;
