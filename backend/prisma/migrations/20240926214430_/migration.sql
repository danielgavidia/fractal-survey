/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Survey` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Survey" ALTER COLUMN "title" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Survey_title_key" ON "Survey"("title");
