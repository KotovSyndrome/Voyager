/*
  Warnings:

  - You are about to drop the column `downvotes` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `likes` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_ownerId_fkey";

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "downvotes",
DROP COLUMN "ownerId",
DROP COLUMN "upvotes",
DROP COLUMN "visibility",
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Example";

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");
