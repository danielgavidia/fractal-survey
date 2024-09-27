import prisma from "./client";
import { v4 as uuidv4 } from "uuid";

async function main() {
    const survey1 = await prisma.survey.upsert({
        where: { title: "Survey 01" },
        update: {},
        create: {
            title: "Survey 01",
            surveyBlocks: {
                create: [
                    {
                        question: "Question01",
                        answers: {
                            create: [
                                { answer: "Answer01" },
                                { answer: "Answer02" },
                                { answer: "Answer03" },
                            ],
                        },
                    },
                    {
                        question: "Question02",
                        answers: {
                            create: [
                                { answer: "Answer01" },
                                { answer: "Answer02" },
                                { answer: "Answer03" },
                            ],
                        },
                    },
                ],
            },
        },
    });
    const survey2 = await prisma.survey.upsert({
        where: { title: "Survey 02" },
        update: {},
        create: {
            title: "Survey 02",
            surveyBlocks: {
                create: [
                    {
                        question: "Question01",
                        answers: {
                            create: [
                                { answer: "Answer01" },
                                { answer: "Answer02" },
                                { answer: "Answer03" },
                            ],
                        },
                    },
                    {
                        question: "Question02",
                        answers: {
                            create: [
                                { answer: "Answer01" },
                                { answer: "Answer02" },
                                { answer: "Answer03" },
                            ],
                        },
                    },
                ],
            },
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
