import { Redirect } from "react-router-dom";

export const withAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!localStorage.getItem("token");
        if (isAuth) {
            return <Component />;
        } else {
            return <Redirect to="/login" />;
        }
    };

    return AuthRoute;
};
