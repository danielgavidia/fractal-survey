import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../globals";

// step 1: use axios to pull Survey object
// step 2: map through Survey object and show all questions, with answer fields
// step 3: build logic for posting answers to DB

interface SurveyTake {
    surveyId: string;
}

interface SurveyBlock {
    id: string;
    question: string;
}

const SurveyTake: React.FC<SurveyTake> = ({ surveyId }) => {
    const [surveyBlocks, setSurveyBlocks] = useState<SurveyBlock[]>([]);

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

    return (
        <div>
            <div>{surveyId}</div>
            <div>
                {surveyBlocks.map((x) => {
                    return <div key={x.id}>{x.question}</div>;
                })}
            </div>
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
