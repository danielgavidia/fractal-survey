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
    const [surveyId, setSurveyId] = useState<string>("");
    const [newQuestion, setNewQuestion] = useState<string>("");

    console.log(`surveyId: ${surveyId}`);

    // useEffect
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(serverURL + "/surveys/");
            const data = res.data;
            const survey01 = data[0];
            const surveyBlocks = survey01.surveyBlocks;
            const surveyId = survey01.id;
            console.log("survey01:");
            console.log(survey01);
            setSurveyId(surveyId);
            setSurveyData(surveyBlocks);
        };
        fetch();
    }, []);

    // add survey block
    const handleAddSurveyBlock = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const surveyBlockNew = {
            id: generateUUID(),
            surveyId: surveyId,
            question: newQuestion,
            answer: "Default",
        };
        setSurveyData([...surveyData, surveyBlockNew]);
        console.log(surveyBlockNew);
        try {
            const res = await axios({
                method: "post",
                url: `${serverURL}/surveyBlock`,
                data: surveyBlockNew,
            });
            console.log(`res: ${res}`);
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    };

    // update survey question
    const handleSetUpdateQuestion = async (id: string, surveyId: string, newQuestion: string) => {
        try {
            const res = await axios({
                method: "put",
                url: `${serverURL}/surveyBlock/`,
                data: {
                    id: id,
                    surveyId: surveyId,
                    question: newQuestion,
                },
            });
            console.log(`res: ${res}`);
        } catch (error) {
            console.log(`Update error: ${error}`);
        }
    };

    // submit survey answer
    const handleSetPostAnswer = async (id: string, surveyId: string, answer: string) => {
        try {
            // const surveyBlock = surveyData.find((x) => x.id === id);
            const res = await axios({
                method: "put",
                url: `${serverURL}/surveyBlockAnswer/`,
                data: {
                    id: id,
                    surveyId: surveyId,
                    answer: answer,
                },
            });
            console.log(`res: ${res}`);
        } catch (error) {
            console.log(`Post answer error: ${error}`);
        }
    };

    // delete survey block
    const handleSetDeleteBlock = async (id: string, surveyId: string) => {
        try {
            setSurveyData((data) => data.filter((x) => x.id !== id));
            const res = await axios({
                method: "delete",
                url: `${serverURL}/surveyBlock/`,
                data: {
                    id: id,
                    surveyId: surveyId,
                },
            });
            console.log(res);
        } catch (error) {
            console.log(`Deletion error: ${error}`);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleAddSurveyBlock}>
                    <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                    <button>Add Question</button>
                </form>
            </div>
            <br />
            <br />
            <div>
                {surveyData.map((x) => (
                    <SurveyBlock
                        key={x.id}
                        surveyId={surveyId}
                        block={x}
                        handleSetUpdateQuestion={handleSetUpdateQuestion}
                        handleSetPostAnswer={handleSetPostAnswer}
                        handleSetDeleteBlock={handleSetDeleteBlock}
                    />
                ))}
            </div>
        </div>
    );
};

export default Survey;
