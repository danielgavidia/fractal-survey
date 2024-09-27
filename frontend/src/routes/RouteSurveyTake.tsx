import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../globals";
import { useNavigate } from "react-router-dom";

interface SurveyTake {
    surveyId: string;
}

interface SurveyBlock {
    id: string;
    question: string;
}

const SurveyTake: React.FC<SurveyTake> = ({ surveyId }) => {
    const [surveyBlocks, setSurveyBlocks] = useState<SurveyBlock[]>([]);
    const [title, setTitle] = useState<string>("");
    // establishes that answers will have multiple keys of the same type
    const [answers, setAnswers] = useState<{ [blockId: string]: string }>({});
    const navigate = useNavigate();

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
        setTitle(data.title);
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
            navigate("/RouteSurveys");
        } catch (error) {
            console.error("ERROR: ", error);
        }
    };

    return (
        <div>
            <div className="py-4 text-md text-center text-primary-content font-bold">{title}</div>
            <div className="">
                <form onSubmit={handleSubmit}>
                    {surveyBlocks.map((block) => {
                        return (
                            <div key={block.id} className="py-4 w-full">
                                <p className="p-1 text-sm text-primary-content">{block.question}</p>
                                <input
                                    type="text"
                                    value={answers[block.id] || ""}
                                    onChange={(e) => handleInputChange(e, block.id)}
                                    className="rounded p-1 text-sm w-full text-primary-content outline-none"
                                />
                            </div>
                        );
                    })}
                    <button className="btn bg-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

const RouteSurveyTake = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    return (
        <div id="RouteSurveyTake" className="p-4 text-neutral-content">
            <SurveyTake surveyId={surveyId as string} />
        </div>
    );
};

export default RouteSurveyTake;
