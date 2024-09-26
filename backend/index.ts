import express from "express";

const app = express();
const port = 3000;

// middleware
const cors = require("cors");
app.use(cors());
app.use(express.json());

// root
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// get surveyData
// let data = [
//     { question: "What is your first name?", answer: "Default" },
//     { question: "What is your last name?", answer: "Default" },
//     { question: "How is your day today?", answer: "Default" },
// ];
let data: { question: string; answer: string }[] = [];

app.get("/surveyData/", (req, res) => {
    res.json(data);
});

// post surveyBlock
app.post("/surveyData", (req, res) => {
    const surveyBlock = req.body;
    if (surveyBlock.question && surveyBlock.answer) {
        data.push(surveyBlock);
        res.status(201).json({ message: "Data received", surveyBlock });
    } else {
        res.status(400).json({ message: "Invalid data" });
    }
});

// port listen
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
