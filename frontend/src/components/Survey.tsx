import { useState } from "react";
import SurveyBlock from "./SurveyBlock";

const data = [
    { question: "What is your first name?", answer: "Default" },
    { question: "What is your last name?", answer: "Default" },
    { question: "How is your day today?", answer: "Default" },
];

const Survey = () => {
    // state
    const [surveyData, setSurveyData] = useState(data);
    const [newQuestion, setNewQuestion] = useState<string>("");

    // add survey block
    const handleAddSurveyBlock = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = {
            question: newQuestion,
            answer: "",
        };
        const surveyDataNew = [...surveyData, surveyBlockNew];
        setSurveyData(surveyDataNew);
    };

    return (
        <div>
            <div>
                <form onSubmit={handleAddSurveyBlock}>
                    <input
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <button>Add Question</button>
                </form>
            </div>
            <br />
            <br />
            <div>
                {surveyData.map((x, id) => (
                    <SurveyBlock key={id} block={x} />
                ))}
            </div>
        </div>
    );
};

export default Survey;
