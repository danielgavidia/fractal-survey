import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.tsx";
import RouteHome from "./routes/RouteHome.tsx";
import RouteSurveyCreate from "./routes/RouteSurveyCreate.tsx";
import RouteSurveyResults from "./routes/RouteSurveyResults.tsx";
import RouteSurveys from "./routes/RouteSurveys.tsx";
import RouteSurveyTake from "./routes/RouteSurveyTake.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "/", element: <RouteHome /> },
            { path: "RouteSurveys/", element: <RouteSurveys /> },
            { path: "RouteSurveyCreate/:surveyId", element: <RouteSurveyCreate /> },
            { path: "RouteSurveyResults/:surveyId", element: <RouteSurveyResults /> },
            { path: "RouteSurveyTake/:surveyId", element: <RouteSurveyTake /> },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
