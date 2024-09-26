import { useState } from "react";

// const data = [
//     { id: 0, question: "What is your first name?", answer: "Default" },
//     { id: 1, question: "What is your last name?", answer: "Default" },
//     { id: 2, question: "How is your day today?", answer: "Default" },
// ];

const Survey = () => {
    const [answer, setAnswer] = useState("");
    const [surveyBlock, setSurveyBlock] = useState({
        question: "What is your name?",
        ans: "",
    });
    console.log(surveyBlock);

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = { ...surveyBlock, ans: answer };
        setSurveyBlock(surveyBlockNew);
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <p>{surveyBlock.question}</p>
                <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button>Submit</button>
            </form>
            <p>Answer:</p>
            <p>{surveyBlock.ans}</p>
        </div>
    );
};

export default Survey;
