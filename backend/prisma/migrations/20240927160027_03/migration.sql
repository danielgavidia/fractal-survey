/*
  Warnings:

  - You are about to drop the column `answer` on the `SurveyBlock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SurveyBlock" DROP COLUMN "answer";

-- CreateTable
CREATE TABLE "SurveyBlockAnswer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "answer" TEXT NOT NULL DEFAULT 'A',
    "surveyBlockId" TEXT,

    CONSTRAINT "SurveyBlockAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyBlockAnswer" ADD CONSTRAINT "SurveyBlockAnswer_surveyBlockId_fkey" FOREIGN KEY ("surveyBlockId") REFERENCES "SurveyBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
