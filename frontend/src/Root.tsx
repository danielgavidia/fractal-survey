import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <div className="navbar bg-primary-content p-4">
                <a href="/" className="flex-1 font-extrabold text-lg text-neutral-content">
                    Fractal Survey App
                </a>
                <a
                    href="/RouteSurveys"
                    className="flex-none btn bg-primary-content text-base-100 w-20"
                >
                    Surveys
                </a>
            </div>
            <Outlet />
        </div>
    );
};

export default Root;
