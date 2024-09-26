import React from "react";
import { useState } from "react";

interface SurveyBlock {
    block: { question: string; answer: string };
}

const SurveyBlock: React.FC<SurveyBlock> = ({ block }) => {
    const [answer, setAnswer] = useState(block.answer);
    const [surveyBlock, setSurveyBlock] = useState(block);
    console.log(surveyBlock);

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = { ...surveyBlock, answer: answer };
        setSurveyBlock(surveyBlockNew);
    };

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <p>{surveyBlock.question}</p>
                <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button>Submit</button>
            </form>
            <p>Answer: {surveyBlock.answer}</p>
        </div>
    );
};

export default SurveyBlock;
