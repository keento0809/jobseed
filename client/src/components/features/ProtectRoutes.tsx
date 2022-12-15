import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import {useCookies} from "react-cookie";

const ProtectRoutes = () => {
    const {seekerState} = useAuthContext();
    const [cookies] = useCookies()

    const pageNav = () => {
        if (seekerState.token && seekerState.seekerLoading) {
            return <h1>Loading.</h1>
        } else if (cookies.JWT_TOKEN) {
            return <Outlet/>
        } else return < Navigate to={"/"}/>
    }
    return pageNav()
};

export default ProtectRoutes;