import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../globals";

interface Survey {
    id: string;
    title: string;
}

const RouteSurveys = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);

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
    return (
        <div id="RouteSurveys">
            <div>Surveys</div>
            <div>
                {surveys.map((x) => {
                    return (
                        <div>
                            <p>{x.title}</p>
                            <div>
                                <button>Take</button>
                                <button>Results</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RouteSurveys;
