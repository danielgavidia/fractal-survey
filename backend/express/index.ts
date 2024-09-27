import express from "express";
import prisma from "../prisma/client";

// setup
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// root
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// port listen
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// -------

// OBJECT: survey
// get all surveys
app.get("/surveys/", async (req, res) => {
    try {
        const surveys = await prisma.survey.findMany({
            include: {
                surveyBlocks: true,
            },
        });
        res.status(200).json(surveys);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// get unique survey
app.get("/surveys/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const survey = await prisma.survey.findUnique({
            where: {
                id: id,
            },
            include: {
                surveyBlocks: {
                    include: {
                        answers: true,
                    },
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        res.status(200).json(survey);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// creates new survey
app.post("/surveys/", async (req, res) => {
    try {
        const { id, title } = req.body;
        const survey = await prisma.survey.create({
            data: { id: id, title: title },
        });
        res.status(200).json({ survey: survey });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// OBJECT: surveyBlock
// Creates brand new survey block
app.post("/surveyBlock/", async (req, res) => {
    try {
        const { surveyId, question, answer } = req.body;
        await prisma.surveyBlock.create({
            data: {
                surveyId: surveyId,
                question: question,
            },
        });
        res.status(200).json({ message: "SUCCESS" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Deletes survey block
app.delete("/surveyBlock/", async (req, res) => {
    try {
        const { id, surveyId } = req.body;
        await prisma.surveyBlock.delete({
            where: {
                id: id,
                surveyId: surveyId,
            },
        });
        res.status(200).json({ message: "SUCCESS" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Updates survey block question
app.put("/surveyBlock/question/", async (req, res) => {
    try {
        const { id, surveyId, question } = req.body;
        await prisma.surveyBlock.update({
            where: {
                id: id,
                surveyId: surveyId,
            },
            data: {
                question: question,
            },
        });
        res.status(200).json({ message: "SUCCESS" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// --
// OBJECT: surveyBlockAnswer
// Post survey block answer
app.post("/surveyBlockAnswer/", async (req, res) => {
    try {
        const { id, surveyBlockId, answer } = req.body;
        await prisma.surveyBlockAnswer.create({
            data: {
                id: id,
                surveyBlockId: surveyBlockId,
                answer: answer,
            },
        });
        res.status(200).json({ message: "SUCCESS" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Post many answers
app.post("/surveyBlockAnswer/many/", async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data);
        await prisma.surveyBlockAnswer.createMany({
            data: data,
        });
        res.status(200).json({ message: "SUCCESS" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});
