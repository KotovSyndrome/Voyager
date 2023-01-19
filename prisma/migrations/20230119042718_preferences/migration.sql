/*
  Warnings:

  - Added the required column `collaboratorJoinedNotification` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentsNotification` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateFormat` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distanceUnits` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remindersNotification` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeFormat` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DistanceUnits" AS ENUM ('MILES', 'KILOMETERS', 'BANANAS');

-- CreateEnum
CREATE TYPE "DateFormat" AS ENUM ('DAY', 'MONTH');

-- CreateEnum
CREATE TYPE "TimeFormat" AS ENUM ('TWELVE', 'TWENTYFOUR');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "collaboratorJoinedNotification" BOOLEAN NOT NULL,
ADD COLUMN     "commentsNotification" BOOLEAN NOT NULL,
ADD COLUMN     "dateFormat" "DateFormat" NOT NULL,
ADD COLUMN     "distanceUnits" "DistanceUnits" NOT NULL,
ADD COLUMN     "remindersNotification" BOOLEAN NOT NULL,
ADD COLUMN     "timeFormat" "TimeFormat" NOT NULL;
