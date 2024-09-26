import express from "express";

const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

// root
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// get surveyData
const data = [
    { question: "What is your first name?", answer: "Default" },
    { question: "What is your last name?", answer: "Default" },
    { question: "How is your day today?", answer: "Default" },
];

app.get("/surveyData/", (req, res) => {
    res.json(data);
});

// port listen
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
