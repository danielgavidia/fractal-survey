import SurveyBlock from "./SurveyBlock";

const data = [
    { question: "What is your first name?", answer: "Default" },
    { question: "What is your last name?", answer: "Default" },
    { question: "How is your day today?", answer: "Default" },
];

const Survey = () => {
    return (
        <div>
            <div>
                {data.map((x, id) => (
                    <SurveyBlock key={id} block={x} />
                ))}
            </div>
        </div>
    );
};

export default Survey;
