import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../globals";

interface Survey {
    id: string;
    title: string;
}

const RouteSurveys = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const navigate = useNavigate();

    // get survey data on refresh
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
            url: `${SERVER_URL}/surveys/`,
        });
        const data = res.data;
        const dataMapped = data.map((x: Survey) => ({ id: x.id, title: x.title }));
        setSurveys(dataMapped);
    };

    // go to survey take
    const navigateSurveyTake = (id: string) => {
        navigate(`/RouteSurveyTake/${id}`);
    };

    // go to survey results
    const navigateSurveyResults = (id: string) => {
        navigate(`/RouteSurveyResults/${id}`);
    };

    return (
        <div id="RouteSurveys" className="p-4">
            <div className="">
                {surveys.map((x) => {
                    return (
                        <div
                            key={x.id}
                            className="flex bg-ghost mt-4 items-center border-b-2 border-base-200"
                        >
                            <div className="flex-1">
                                <p className="text-primary-content">{x.title}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => navigateSurveyTake(x.id)}
                                    className="bg-primary btn p-2 w-20 border-none"
                                >
                                    Take
                                </button>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => navigateSurveyResults(x.id)}
                                    className="bg-primary btn p-2 w-20 border-none"
                                >
                                    Results
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RouteSurveys;
