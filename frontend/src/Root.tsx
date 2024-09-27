import { Link, Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <div className="navbar bg-primary-content p-4">
                <Link to="/" className="flex-1 font-extrabold text-lg text-neutral-content">
                    Fractal Survey App
                </Link>
                <Link
                    to="/RouteSurveys"
                    className="flex-none btn bg-primary-content text-base-100 w-20"
                >
                    Surveys
                </Link>
            </div>
            <Outlet />
        </div>
    );
};

export default Root;
