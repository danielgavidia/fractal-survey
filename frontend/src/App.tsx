// import { useState } from "react";
import Survey from "./components/Survey";

// const data = [
//     { id: 0, question: "What is your first name?", answer: "Default" },
//     { id: 1, question: "What is your last name?", answer: "Default" },
//     { id: 2, question: "How is your day today?", answer: "Default" },
// ];

// interface Survey {
//     id: number;
//     question: string;
//     answer: string;
// }

// interface SurveyBlock {
//     id: number;
//     surveys: Survey[];
//     onFormSubmit: (surveys: Survey[], id: number, answer: string) => void;
// }

// const SurveyBlock: React.FC<SurveyBlock> = ({ surveys, id, onFormSubmit }) => {
//     const [answer, setAnswer] = useState<string>("");
//     const survey = surveys.find((x) => x.id === id);
//     console.log(answer);
//     return (
//         <form action="submit" onSubmit={() => onFormSubmit(surveys, id, answer)}>
//             <p>{survey.question}</p>
//             <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
//             <button type="submit">Click</button>
//         </form>
//     );
// };

const App = () => {
    //     const [surveys, setSurveys] = useState<Survey[]>(data);

    //     const onFormSubmit = (surveys: Survey[], id: number, answer: string) => {
    //         const surveyBlock = surveys.find((x) => x.id === id);
    //         const surveyBlockNew = { ...surveyBlock, answer: answer };
    //         const surveyBlocksNew = surveys.map((x) => {
    //             if (x.id === id) {
    //                 return surveyBlockNew;
    //             } else {
    //                 return x;
    //             }
    //         });
    //         setSurveys(surveyBlocksNew);
    //     };

    return (
        <div>
            <Survey />
        </div>
        // <div>
        //     <div>
        //         {surveys.map((x, id) => {
        //             return <div key={id}>{x.answer}</div>;
        //         })}
        //     </div>
        //     <div>
        //         {data.map((x, id) => {
        //             return (
        //                 <SurveyBlock
        //                     key={id}
        //                     surveys={surveys}
        //                     id={x.id}
        //                     onFormSubmit={onFormSubmit}
        //                 />
        //             );
        //         })}
        //     </div>
        // </div>
    );
};

export default App;
