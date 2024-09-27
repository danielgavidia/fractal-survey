-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyBlock" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "question" TEXT NOT NULL DEFAULT 'Q',
    "answer" TEXT NOT NULL DEFAULT 'A',
    "surveyId" TEXT,

    CONSTRAINT "SurveyBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyBlock" ADD CONSTRAINT "SurveyBlock_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
