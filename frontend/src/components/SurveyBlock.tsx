import React from "react";
import { useState } from "react";

interface SurveyBlock {
    block: { question: string; answer: string };
}

// const Question

const SurveyBlock: React.FC<SurveyBlock> = ({ block }) => {
    const [answer, setAnswer] = useState(block.answer);
    const [question, setQuestion] = useState(block.question);
    const [surveyBlock, setSurveyBlock] = useState(block);
    console.log(surveyBlock);

    const [editQuestion, setEditQuestion] = useState<boolean>(false);
    const handleSetEditQuestion = () => {
        setEditQuestion(!editQuestion);
    };
    console.log(`editQuestion: ${editQuestion}`);
    const onFormSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = { ...surveyBlock, question: question };
        setSurveyBlock(surveyBlockNew);
        handleSetEditQuestion();
    };

    const onFormSubmitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = { ...surveyBlock, answer: answer };
        setSurveyBlock(surveyBlockNew);
    };

    return (
        <div>
            {/* Edit questions */}
            {editQuestion ? (
                <div>
                    <form onSubmit={onFormSubmitQuestion}>
                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <button type="submit">Done editing question</button>
                    </form>
                </div>
            ) : (
                <div>
                    <button onClick={() => handleSetEditQuestion()}>
                        edit question
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
        </div>
    );
};

export default SurveyBlock;
