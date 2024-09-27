import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../globals";

interface Survey {
    surveyId: string;
}

interface SurveyBlock {
    id: string;
    question: string;
    answers: SurveyBlockAnswer[];
}

interface SurveyBlockAnswer {
    id: string;
    createdAt: string;
    updatedAt: string;
    surveyBlockId: string;
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
            id: x.id,
            question: x.question,
            answers: x.answers,
        }));
        setSurveyTitle(data.title);
        setSurveyBlocks(blocksMapped);
    };
    return (
        <div>
            <div className="text-lg py-2 text-center font-bold">{surveyTitle}</div>
            <div>
                {surveyBlocks.map((x, id) => {
                    const answers = x.answers;
                    const answersMapped = answers.map((x) => ({
                        answer: x.answer,
                        timestamp: x.createdAt,
                    }));
                    return (
                        <div key={id} className="py-4 border-b-2 border-base-200">
                            <p className="font-bold">{x.question}</p>
                            <div>
                                {answersMapped.map((answer, id) => {
                                    const timestamp = answer.timestamp;
                                    const timestampParsed = new Date(Date.parse(timestamp));
                                    const dateFormatter = new Intl.DateTimeFormat("en-US", {
                                        year: "2-digit",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });
                                    const timestampFinal = dateFormatter.format(timestampParsed);
                                    return (
                                        <div className="items-center">
                                            <div key={id} className="text-xs">
                                                {answer.answer}
                                            </div>
                                            <div className="text-xs pr-2 text-base-300">
                                                {timestampFinal}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const RouteSurveyResults = () => {
    const { surveyId } = useParams<{ surveyId: string }>();

    return (
        <div id="RouteSurveyResults" className="p-4">
            <SurveyResults surveyId={surveyId as string} />
        </div>
    );
};

export default RouteSurveyResults;
