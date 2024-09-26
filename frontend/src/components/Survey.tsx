import { useState, useEffect } from "react";
import SurveyBlock from "./SurveyBlock";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const serverURL = "http://localhost:3000";

const generateUUID = (): string => {
    return uuidv4();
};

interface iSurveyBlock {
    id: string;
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
            id: generateUUID(),
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

    // delete survey block
    const handleSetDeleteBlock = (id: string): void => {
        console.log(id);
        try {
            const surveyDataNew = surveyData.filter((x) => x.id !== id);
            setSurveyData(surveyDataNew);
            axios.delete(serverURL + "/surveyData/" + id);
        } catch (error) {
            console.log(`Deletion error: ${error}`);
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
                    <SurveyBlock
                        key={id}
                        block={x}
                        handleSetDeleteBlock={handleSetDeleteBlock}
                    />
                ))}
            </div>
        </div>
    );
};

export default Survey;
