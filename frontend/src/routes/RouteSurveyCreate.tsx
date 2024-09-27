import Survey from "../components/Survey";
import { useParams } from "react-router-dom";

const RouteSurveyCreate = () => {
    const { surveyId } = useParams<{ surveyId: string }>();
    console.log(`surveyId RootSurveyCreate: ${surveyId}`);

    if (surveyId == undefined) return <div>error: surveyId is undefined</div>;
    return (
        <div id="RouteSurveyCreate" className="p-4">
            <div className="py-4">
                <p className="italic text-sm">Add questions to your survey</p>
            </div>
            <Survey surveyId={surveyId} />
        </div>
    );
};

export default RouteSurveyCreate;
