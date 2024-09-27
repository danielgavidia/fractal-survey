import express from "express";
import { getSurvey } from "../prisma_scripts/survey";
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
// data
let data: { id: string; question: string; answer: string }[] = [];

// get all surveys
app.get("/surveys/", async (req, res) => {
    const surveys = await getSurvey();
    console.log(surveys);
    res.json(surveys);
});

// OBJECT: surveyBlock
// Creates brand new survey block
app.post("/surveyBlock", async (req, res) => {
    const surveyBlock = req.body;
    if (surveyBlock.surveyId && surveyBlock.question && surveyBlock.answer) {
        await prisma.surveyBlock.create({
            data: {
                surveyId: surveyBlock.surveyId,
                question: surveyBlock.question,
                answer: surveyBlock.answer,
            },
        });
        res.status(201).json({ message: "Data received", surveyBlock });
    } else {
        res.status(400).json({ message: "Invalid data" });
    }
});

// Deletes survey block
app.delete("/surveyBlock", async (req, res) => {
    const body = req.body;
    await prisma.surveyBlock.delete({
        where: {
            id: body.id,
            surveyId: body.surveyId,
        },
    });
    res.status(200).json({ message: "Data deleted" });
    console.log(data);
});

// Updates default survey block answer
app.post("/surveyBlock/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    data = data.map((x) => {
        if (x.id === id) {
            return { ...x, answer: body.answer };
        }
        return x;
    });
    res.status(200).json({ message: "Answer added" });
    console.log(data);
});

// Updates survey block question
app.put("/surveyBlock/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    data = data.map((x) => {
        if (x.id === id) {
            return { ...x, question: body.question };
        }
        return x;
    });
    res.status(200).json({ message: "Data updated" });
    console.log(data);
});
