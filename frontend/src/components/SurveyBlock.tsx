import React from "react";
import { useState } from "react";

interface SurveyBlock {
    surveyId: string;
    block: { id: string; question: string; answer: string };
    handleSetUpdateQuestion: (id: string, surveyId: string, newQuestion: string) => void;
    handleSetDeleteBlock: (id: string, surveyId: string) => void;
}

const SurveyBlock: React.FC<SurveyBlock> = ({
    surveyId,
    block,
    handleSetUpdateQuestion,
    handleSetDeleteBlock,
}) => {
    // state
    const [surveyBlock, setSurveyBlock] = useState(block);

    // questions
    const [question, setQuestion] = useState(block.question);
    const [editQuestion, setEditQuestion] = useState<boolean>(false);
    const handleSetEditQuestion = () => {
        setEditQuestion(!editQuestion);
    };
    const onFormSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = { ...surveyBlock, question: question };
        setSurveyBlock(surveyBlockNew);
        handleSetEditQuestion();
        handleSetUpdateQuestion(block.id, surveyId, question);
    };

    return (
        <div>
            {editQuestion ? (
                <div className="border-b-2 border-base-200 py-2">
                    <form onSubmit={onFormSubmitQuestion} className="flex items-center">
                        <div className="flex-1">
                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full p-2 rounded outline-none bg-base-100 border-2 border-accent"
                            />
                        </div>
                        <div className="btn ml-2 w-20 bg-accent">
                            <button type="submit">Done</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex py-2 items-center border-b-2 border-base-200">
                    <div className="flex-1">
                        <p className="">{surveyBlock.question}</p>
                    </div>
                    <button onClick={() => handleSetEditQuestion()} className="btn ml-2 w-20">
                        Edit
                    </button>
                    <button
                        onClick={() => handleSetDeleteBlock(block.id, surveyId)}
                        className="btn ml-2 w-20"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default SurveyBlock;
