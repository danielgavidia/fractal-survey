import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../globals";

interface Survey {
    surveyId: string;
}

interface SurveyBlock {
    question: string;
    answer: string;
}

const SurveyResults: React.FC<Survey> = ({ surveyId }) => {
    const [surveyTitle, setSurveyTitle] = useState<string>("");
    const [surveyBlocks, setSurveyBlocks] = useState<SurveyBlock[]>([]);

    // refresh survey blocks
    useEffect(() => {
        const fetch = async () => {
            getSurveyData();
        };
        fetch();
    }, []);

    // get survey blocks
    const getSurveyData = async () => {
        const res = await axios({
            method: "GET",
            url: `${SERVER_URL}/surveys/${surveyId}`,
        });
        const data = res.data;
        const blocks = data.surveyBlocks;
        const blocksMapped = blocks.map((x: SurveyBlock) => ({
            question: x.question,
            answer: x.answer,
        }));
        setSurveyTitle(data.title);
        setSurveyBlocks(blocksMapped);
    };
    return (
        <div>
            <div>
                <h1>{surveyTitle}</h1>
                <h2>{surveyId}</h2>
            </div>
            <div>
                {surveyBlocks.map((x, id) => {
                    return <div key={id}>{x.question}</div>;
                })}
            </div>
        </div>
    );
};

const RouteSurveyResults = () => {
    const { surveyId } = useParams<{ surveyId: string }>();

    return (
        <div id="RouteSurveyResults">
            <SurveyResults surveyId={surveyId as string} />
        </div>
    );
};

export default RouteSurveyResults;
