import React from "react";
import { useState } from "react";

interface SurveyBlock {
    surveyId: string;
    block: { id: string; question: string; answer: string };
    handleSetUpdateQuestion: (id: string, surveyId: string, newQuestion: string) => void;
    handleSetPostAnswer: (id: string, answer: string) => void;
    handleSetDeleteBlock: (id: string, surveyId: string) => void;
}

const SurveyBlock: React.FC<SurveyBlock> = ({
    surveyId,
    block,
    handleSetUpdateQuestion,
    handleSetPostAnswer,
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

    // answers
    const [answer, setAnswer] = useState(block.answer);
    const onFormSubmitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const surveyBlockNew = { ...surveyBlock, answer: answer };
        setSurveyBlock(surveyBlockNew);
        handleSetPostAnswer(block.id, answer);
    };

    return (
        <div>
            {/* Edit questions */}
            {editQuestion ? (
                <div>
                    <form onSubmit={onFormSubmitQuestion}>
                        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
                        <button type="submit">Done editing question</button>
                    </form>
                </div>
            ) : (
                <div>
                    <button onClick={() => handleSetEditQuestion()}>Edit Question</button>
                    <p>{surveyBlock.question}</p>
                </div>
            )}
            {/* Regular form */}
            <form onSubmit={onFormSubmitAnswer}>
                <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <button>Submit</button>
            </form>
            {/* Answer */}
            <p>Answer: {surveyBlock.answer}</p>
            <button onClick={() => handleSetDeleteBlock(block.id, surveyId)}>Delete</button>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default SurveyBlock;
