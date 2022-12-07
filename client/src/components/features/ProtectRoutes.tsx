import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useSeekerContext} from "../context/seekerContext";
import seeker from "../../data/Seeker";

const ProtectRoutes = () => {
    const [cookie] = useCookies();
    const {seeker, loadingSeeker, setLoadingSeeker} = useSeekerContext()
    const pageNav = () => {
        if (cookie.JWT_TOKEN && !seeker && loadingSeeker) {
            return <h1>Loading.</h1>
        } else if (cookie.JWT_TOKEN && seeker) {
            return <Outlet/>
        } else return < Navigate to={"/"}/>

    }
    return pageNav()
};

export default ProtectRoutes;