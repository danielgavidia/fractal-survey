import { useState } from "react";

const data = [
    { question: "What is your first name?", answer: "Default" },
    { question: "What is your last name?", answer: "Default" },
    { question: "How is your day today?", answer: "Default" },
];

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
            <p>Answer:</p>
            <p>{surveyBlock.answer}</p>
        </div>
    );
};

const Survey = () => {
    return (
        <div>
            {data.map((x, id) => (
                <SurveyBlock key={id} block={x} />
            ))}
        </div>
    );
};

export default Survey;
