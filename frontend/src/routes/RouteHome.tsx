import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../globals";

const RouteHome = () => {
    const [surveyTitle, setSurveyTitle] = useState<string>("");
    const navigate = useNavigate();

    const handleCreateSurvey = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default
        const req = { title: surveyTitle };
        const res = await axios({
            // create new entry in Survey model
            method: "post",
            url: `${SERVER_URL}/surveys/`,
            data: req,
        });
        setSurveyTitle(""); // revert back survey title to ""
        navigate(`/RouteSurveyCreate/${res.data.survey.id}`); // navigate to new survey route
    };

    return (
        <div id="RouteHome" className="p-4 h-screen">
            <div className="flex justify-center">
                <form onSubmit={handleCreateSurvey} className="py-10 flex items-center w-full">
                    <div className="rounded flex-1">
                        <input
                            value={surveyTitle}
                            onChange={(e) => setSurveyTitle(e.target.value)}
                            placeholder="New survey title"
                            className="h-10 p-2 rounded outline-none w-full"
                        />
                    </div>
                    <div className="ml-4">
                        <button className="h-10 btn bg-primary w-20 text-accent-content rounded border-none">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RouteHome;
