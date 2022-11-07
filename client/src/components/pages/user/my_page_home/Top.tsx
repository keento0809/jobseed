import React, {useState} from 'react';
import UserNav from "./UserNav";
import Interested from "./Interested";
import Applied from "./Applied";
import Rejected from "./Rejected";
import Interview from "./Interview";
import {Outlet} from "react-router-dom";

const TopPage = () => {

    const [showPage, setShowPage] = useState("Interested")
    const pageRender = (showPage: string) => {
        switch (showPage) {
            case "Interested":
                return < Interested />
            case "Applied":
                return <Applied/>
            case "Interview":
                return < Interview/>
            case "Rejected":
                return <Rejected />
        }
    }

    return (
        <div className="wrapper">
            <UserNav showPage={showPage} setShowPage={setShowPage}/>
            {/*{ pageRender(showPage) }*/}
            < Outlet />
        </div>
    );
};

export default TopPage;
