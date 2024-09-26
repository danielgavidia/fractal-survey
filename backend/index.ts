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

// data
let data: { id: string; question: string; answer: string }[] = [];

// get surveyData
app.get("/surveyData/", (req, res) => {
    res.json(data);
});

// post surveyData
app.post("/surveyData", (req, res) => {
    const surveyBlock = req.body;
    if (surveyBlock.question && surveyBlock.answer) {
        data.push(surveyBlock);
        res.status(201).json({ message: "Data received", surveyBlock });
    } else {
        res.status(400).json({ message: "Invalid data" });
    }
});

// post surveyBlock answer
app.post("/surveyData/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    data = data.map((x) => {
        if (x.id === id) {
            return { ...x, ...body };
        }
        return x;
    });
    res.status(200).json({ message: "Answer added" });
    console.log(data);
});

// delete surveyData
app.delete("/surveyData/:id", (req, res) => {
    const id = req.params.id;
    data = data.filter((x) => x.id !== id);
    res.status(200).json({ message: "Data deleted" });
    console.log(data);
});

// update surveyBlock question
app.put("/surveyData/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    data = data.map((x) => {
        if (x.id === id) {
            return { ...x, ...body };
        }
        return x;
    });
    res.status(200).json({ message: "Data updated" });
    console.log(data);
});

// port listen
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
