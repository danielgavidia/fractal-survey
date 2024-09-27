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
        <div id="RouteSurveys">
            <div>Surveys</div>
            <div>
                {surveys.map((x) => {
                    return (
                        <div key={x.id}>
                            <p>{x.title}</p>
                            <div>
                                <button onClick={() => navigateSurveyTake(x.id)}>Take</button>
                                <button onClick={() => navigateSurveyResults(x.id)}>Results</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RouteSurveys;
