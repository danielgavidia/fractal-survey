import Survey from "../components/Survey";
import { useParams } from "react-router-dom";

const RouteSurveyCreate = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    console.log(`surveyId RootSurveyCreate: ${surveyId}`);
    return (
        <div id="RouteSurveyCreate" className="p-4">
            <div>
                <p>Create</p>
            </div>
            <Survey surveyId={surveyId as string} />
        </div>
    );
};

export default RouteSurveyCreate;
