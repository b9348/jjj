import { Navigate, useLocation } from "react-router-dom";

const RouteGuard = (props) => {
    const { pathname } = useLocation();
    const token = localStorage.getItem("token");

    // WhiteList of routes that can be accessed without token
    const whiteList = ["/pages/login"];

    // Check if the current route is in the white list
    if (whiteList.includes(pathname)) {
        return props.children;
    }

    // Check if the user has a token
    if (token) {
        return props.children;
    } else {
        return <Navigate to="/pages/login" state={{ from: pathname }} />;
    }
}

export default RouteGuard;
