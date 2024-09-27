import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateUUID, SERVER_URL } from "../globals";

const RouteHome = () => {
    const [surveyTitle, setSurveyTitle] = useState<string>("");
    const navigate = useNavigate();

    const handleCreateSurvey = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default
        const generatedSurveyId = generateUUID(); // generate UUID
        const req = { id: generatedSurveyId, title: surveyTitle };
        await axios({
            // create new entry in Survey model
            method: "post",
            url: `${SERVER_URL}/surveys/`,
            data: req,
        });
        setSurveyTitle(""); // revert back survey title to ""
        navigate(`/RouteSurveyCreate/${generatedSurveyId}`); // navigate to new survey route
    };
    return (
        <div id="RouteHome">
            <div className="bg-red-300">
                <form onSubmit={handleCreateSurvey}>
                    <p>Create new survey</p>
                    <p>Survey Name: </p>
                    <input value={surveyTitle} onChange={(e) => setSurveyTitle(e.target.value)} />
                    <button>Create</button>
                </form>
            </div>
        </div>
    );
};

export default RouteHome;
