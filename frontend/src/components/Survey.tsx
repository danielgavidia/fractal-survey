import { useState, useEffect } from "react";
import SurveyBlock from "./SurveyBlock";
import axios from "axios";

const serverURL = "http://localhost:3000";

interface iSurveyBlock {
    question: string;
    answer: string;
}

const Survey = () => {
    // state
    const [surveyData, setSurveyData] = useState<iSurveyBlock[]>([]);
    const [newQuestion, setNewQuestion] = useState<string>("");

    // useEffect
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(serverURL + "/surveyData/");
            const data = res.data;
            setSurveyData(data);
        };
        fetch();
    }, []);

    console.log("Survey data");
    console.log(surveyData);

    // add survey block
    const handleAddSurveyBlock = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const surveyBlockNew = {
            question: newQuestion,
            answer: "Default",
        };
        setSurveyData([...surveyData, surveyBlockNew]);
        console.log(surveyBlockNew);
        try {
            const res = await axios.post(
                serverURL + "/surveyData/",
                surveyBlockNew
            );
            console.log(`res: ${res}`);
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
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
