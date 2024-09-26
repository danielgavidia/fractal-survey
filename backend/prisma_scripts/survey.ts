import prisma from "../prisma/client";

// Get survey
export const getSurvey = async () => {
    const survey = await prisma.survey.findMany();
    return survey;
};
