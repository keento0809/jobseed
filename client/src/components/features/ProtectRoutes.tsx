import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";

const ProtectRoutes = () => {
    const {seekerState} = useAuthContext();

    const pageNav = () => {
        if (seekerState.token && seekerState.seekerLoading) {
            return <h1>Loading.</h1>
        } else if (seekerState.token && !seekerState.seekerLoading ) {
            return <Outlet/>
        } else return < Navigate to={"/"}/>

    }
    return pageNav()
};

export default ProtectRoutes;