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
            <div className="p-2 flex justify-center">
                <form onSubmit={handleCreateSurvey} className="py-10 flex">
                    <div className="p-4 rounded">
                        <input
                            value={surveyTitle}
                            onChange={(e) => setSurveyTitle(e.target.value)}
                            placeholder="New survey title"
                            className="h-10 p-2 rounded"
                        />
                    </div>
                    <div className="p-4">
                        <button className="h-10 bg-primary w-20 text-accent-content rounded">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RouteHome;
