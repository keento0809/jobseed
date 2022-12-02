import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";

const ProtectRoutes = () => {
    const [cookie] = useCookies();
    return ( cookie.JWT_TOKEN ? <Outlet/> : < Navigate to={"/home"}/> )
};

export default ProtectRoutes;