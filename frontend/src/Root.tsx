import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <div className="navbar bg-neutral">
                <a href="/" className="flex-1 p-2">
                    Fractal Survey App
                </a>
                <a href="/RouteSurveys" className="flex-none btn">
                    Surveys
                </a>
            </div>
            <Outlet />
        </div>
    );
};

export default Root;
