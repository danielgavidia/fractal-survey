import { Outlet } from "react-router-dom";

const navbarButtons = [
    { path: "/RouteSurveys", name: "Surveys" },
    { path: "/RouteSurveyCreate", name: "Create Survey" },
    { path: "/RouteSurveyResults", name: "Survey Results" },
];

const Root = () => {
    return (
        <div>
            <nav>
                <div>Fractal Survey App</div>
                <div>
                    {navbarButtons.map((x, id) => {
                        return (
                            <div key={id}>
                                <a href={x.path}>{x.name}</a>
                            </div>
                        );
                    })}
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Root;
