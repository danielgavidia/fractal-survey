import { useState, useEffect } from "react";
import SurveyBlock from "./SurveyBlock";
import axios from "axios";

const serverURL = "http://localhost:3000";

const Survey = () => {
    // state
    const [surveyData, setSurveyData] = useState([]);
    const [newQuestion, setNewQuestion] = useState<string>("");

    // useEffect
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(serverURL + "/surveyData");
            setSurveyData(res.data);
        };
        fetch();
    }, []);

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
