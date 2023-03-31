-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "ipAddress" TEXT,
ALTER COLUMN "destinations" SET NOT NULL,
ALTER COLUMN "destinations" SET DATA TYPE TEXT;
