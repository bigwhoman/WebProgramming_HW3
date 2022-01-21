import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const useAuth = ({token}) => {
    let loggedIn = false;
    if (token)
        loggedIn = true;
    return loggedIn;
}

function ProtectedRoutes() {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to={"*"}/>
}

export default ProtectedRoutes;