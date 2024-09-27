import Survey from "../components/Survey";
import { useParams } from "react-router-dom";

const RouteSurveyCreate = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    console.log(`surveyId RootSurveyCreate: ${surveyId}`);
    return (
        <div id="RouteSurveyCreate">
            <div>{surveyId}</div>
            <Survey surveyId={surveyId as string} />
        </div>
    );
};

export default RouteSurveyCreate;
