import { useState, useEffect } from "react";
import SurveyBlock from "./SurveyBlock";
import axios from "axios";
import { SERVER_URL, generateUUID } from "../globals";

interface iSurveyBlock {
    id: string;
    question: string;
    answer: string;
}

interface iSurvey {
    surveyId: string;
}

const Survey: React.FC<iSurvey> = ({ surveyId }) => {
    // state
    const [surveyBlocks, setSurveyBlocks] = useState<iSurveyBlock[]>([]);
    const [surveyTitle, setSurveyTitle] = useState<string>("");
    const [newQuestion, setNewQuestion] = useState<string>("");

    // useEffect
    useEffect(() => {
        const fetch = async () => {
            getSurveyData();
        };
        fetch();
    }, []);

    // get survey data
    const getSurveyData = async () => {
        const res = await axios({
            method: "GET",
            url: `${SERVER_URL}/surveys/${surveyId}`,
        });
        const data = res.data;
        setSurveyTitle(data.title);
        setSurveyBlocks(data.surveyBlocks);
    };

    // add survey block
    const handleAddSurveyBlock = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            await axios({
                method: "POST",
                url: `${SERVER_URL}/surveyBlock/`,
                data: {
                    id: generateUUID(),
                    surveyId: surveyId,
                    question: newQuestion,
                    answer: "Default",
                },
            });
            getSurveyData();
        } catch (error) {
            console.error("Error submitting form data:", error);
        }
    };

    // update survey question
    const handleSetUpdateQuestion = async (id: string, surveyId: string, newQuestion: string) => {
        try {
            await axios({
                method: "PUT",
                url: `${SERVER_URL}/surveyBlock/question/`,
                data: {
                    id: id,
                    surveyId: surveyId,
                    question: newQuestion,
                },
            });
            getSurveyData();
        } catch (error) {
            console.log(`Update error: ${error}`);
        }
    };

    // delete survey block
    const handleSetDeleteBlock = async (id: string, surveyId: string) => {
        try {
            await axios({
                method: "DELETE",
                url: `${SERVER_URL}/surveyBlock/`,
                data: {
                    id: id,
                    surveyId: surveyId,
                },
            });
            getSurveyData();
        } catch (error) {
            console.log(`Deletion error: ${error}`);
        }
    };

    return (
        <div>
            <div className="text-center font-bold">{surveyTitle}</div>
            <div className="py-4">
                <form onSubmit={handleAddSurveyBlock} className="flex items-center">
                    <div className="flex-1 pr-2">
                        <input
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Question"
                            className="w-full p-2 rounded outline-none"
                        />
                    </div>
                    <div>
                        <button className="btn bg-primary w-20">Add</button>
                    </div>
                </form>
            </div>
            <div>
                {surveyBlocks.map((x) => (
                    <SurveyBlock
                        key={x.id}
                        surveyId={surveyId}
                        block={x}
                        handleSetUpdateQuestion={handleSetUpdateQuestion}
                        handleSetDeleteBlock={handleSetDeleteBlock}
                    />
                ))}
            </div>
        </div>
    );
};

export default Survey;
