import React from "react";
import { useState } from "react";

interface SurveyBlock {
    block: { question: string; answer: string };
}

const SurveyBlock: React.FC<SurveyBlock> = ({ block }) => {
    // state
    const [surveyBlock, setSurveyBlock] = useState(block);
    console.log(surveyBlock);

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
    };

    // answers
    const [answer, setAnswer] = useState(block.answer);
    const onFormSubmitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = { ...surveyBlock, answer: answer };
        setSurveyBlock(surveyBlockNew);
    };

    // delete
    const [deleteBlock, setDeleteBlock] = useState(false);
    const handleSetDeleteBlock = () => {
        setDeleteBlock(!deleteBlock);
    };

    return (
        <div>
            {deleteBlock ? (
                <div></div>
            ) : (
                <div>
                    {/* Edit questions */}
                    {editQuestion ? (
                        <div>
                            <form onSubmit={onFormSubmitQuestion}>
                                <input
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                />
                                <button type="submit">
                                    Done editing question
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => handleSetEditQuestion()}>
                                Edit Question
                            </button>
                            <p>{surveyBlock.question}</p>
                        </div>
                    )}
                    {/* Regular form */}
                    <form onSubmit={onFormSubmitAnswer}>
                        <input
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <button>Submit</button>
                    </form>
                    {/* Answer */}
                    <p>Answer: {surveyBlock.answer}</p>
                    <button onClick={() => handleSetDeleteBlock()}>
                        Delete
                    </button>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            )}
        </div>
    );
};

export default SurveyBlock;
