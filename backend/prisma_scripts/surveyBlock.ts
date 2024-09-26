import prisma from "../prisma/client";

// Creates brand new survey block
export const postSurveyBlock = async (question: string, answer: string) => {
    const surveyBlock = await prisma.surveyBlock.create({
        data: {
            question: question,
            answer: answer,
        },
    });
    console.log(surveyBlock);
};

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
