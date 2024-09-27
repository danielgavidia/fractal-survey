import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../globals";

interface SurveyTake {
    surveyId: string;
}

interface SurveyBlock {
    id: string;
    question: string;
}

const SurveyTake: React.FC<SurveyTake> = ({ surveyId }) => {
    const [surveyBlocks, setSurveyBlocks] = useState<SurveyBlock[]>([]);
    // establishes that answers will have multiple keys of the same type
    const [answers, setAnswers] = useState<{ [blockId: string]: string }>({});
    console.log(answers);

    // load survey blocks
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
        const blocks = data.surveyBlocks;
        const blocksMapped = blocks.map((x: SurveyBlock) => ({ id: x.id, question: x.question }));
        setSurveyBlocks(blocksMapped);
    };

    // on change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, blockId: string) => {
        const { value } = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [blockId]: value,
        }));
    };

    // submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = Object.entries(answers);
            const dataMapped = data.map((x) => ({ surveyBlockId: x[0], answer: x[1] }));
            console.log(dataMapped);
            await axios({
                method: "POST",
                url: `${SERVER_URL}/surveyBlockAnswer/many/`,
                data: { data: dataMapped },
            });
        } catch (error) {
            console.error("ERROR: ", error);
        }
    };

    return (
        <div>
            <div>{surveyId}</div>
            <form onSubmit={handleSubmit}>
                {surveyBlocks.map((block) => {
                    return (
                        <div key={block.id}>
                            <p>{block.question}</p>
                            <input
                                type="text"
                                value={answers[block.id] || ""}
                                onChange={(e) => handleInputChange(e, block.id)}
                            />
                        </div>
                    );
                })}
                <button>Submit</button>
            </form>
        </div>
    );
};

const RouteSurveyTake = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    return (
        <div id="RouteSurveyTake">
            <SurveyTake surveyId={surveyId as string} />
        </div>
    );
};

export default RouteSurveyTake;
