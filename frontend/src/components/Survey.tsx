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

    // console.log(`surveyId Survey Component: ${surveyId}`);

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

    // submit survey answer
    // const handleSetPostAnswer = async (id: string, surveyId: string, answer: string) => {
    //     try {
    //         await axios({
    //             method: "PUT",
    //             url: `${SERVER_URL}/surveyBlock/answer/`,
    //             data: {
    //                 id: id,
    //                 surveyId: surveyId,
    //                 answer: answer,
    //             },
    //         });
    //         getSurveyData();
    //     } catch (error) {
    //         console.log(`Post answer error: ${error}`);
    //     }
    // };

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
            <h1>Survey Title: {surveyTitle}</h1>
            <h2>Survey ID: {surveyId}</h2>
            <div>
                <form onSubmit={handleAddSurveyBlock}>
                    <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                    <button>Add Question</button>
                </form>
            </div>
            <br />
            <br />
            <div>
                {surveyBlocks.map((x) => (
                    <SurveyBlock
                        key={x.id}
                        surveyId={surveyId}
                        block={x}
                        handleSetUpdateQuestion={handleSetUpdateQuestion}
                        // handleSetPostAnswer={handleSetPostAnswer}
                        handleSetDeleteBlock={handleSetDeleteBlock}
                    />
                ))}
            </div>
        </div>
    );
};

export default Survey;
