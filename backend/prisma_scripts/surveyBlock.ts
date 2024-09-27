import prisma from "../prisma/client";

// Retrieves all survey blocks
// export const getSurveyBlocks = async ()

// Deletes survey block
export const deleteSurveyBlock = async (id: string) => {
    const surveyBlock = await prisma.surveyBlock.delete({
        where: {
            id: id,
        },
    });
    console.log(surveyBlock);
};

// Updates default survey block answer
export const updateSurveyBlockAnswer = async (id: string, answer: string) => {
    const surveyBlock = await prisma.surveyBlock.update({
        where: {
            id: id,
        },
        data: {
            answer: answer,
        },
    });
    console.log(surveyBlock);
};

// Updates survey block question
export const updateSurveyBlock = async (id: string, question: string) => {
    const surveyBlock = await prisma.surveyBlock.update({
        where: {
            id: id,
        },
        data: {
            question: question,
        },
    });
};
