/*
  Warnings:

  - You are about to drop the column `needsTransport` on the `Guest` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TransportType" AS ENUM ('car', 'train');

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "needsTransport",
ADD COLUMN     "whichTransport" "TransportType";
