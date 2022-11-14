import React, {useState} from 'react';
import UserNav from "../../components/features/user/UserNav";
import Interested from "../../components/features/user/Interested";
import Applied from "../../components/features/user/Applied";
import Rejected from "../../components/features/user/Rejected";
import Interview from "../../components/features/user/Interview";
import UserProfile from "../../components/features/user/UserProfile";
import human from "../../images/human.png";
import Button_sm from "../../components/models/Button_sm";
import {useCompanyContext} from "../../components/context/companyContext";
import CompanyModal from "./CompanyModal";

const TopPage = () => {
    const [showPage, setShowPage] = useState<string>("interested")
    const [showModal, setShowModal] = useState<boolean>(false)

    const pageRender = (showPage: string) => {
        switch (showPage) {
            case "interested":
                return < Interested/>
            case "applied":
                return < Applied/>
            case "interview":
                return < Interview/>
            case "rejected":
                return < Rejected/>
        }
    }

    const modalHandler = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        showModal === true ? setShowModal(false) : setShowModal(true)
    }

    return (
        <div className="wrapper lg:grid grid-cols-5">
            < UserProfile
                name={"Misato Tanno"}
                email={"misato@gmail.com"}
                avatar={human}
            />
            <div className="lg:col-span-4">
                <UserNav
                    showPage={showPage}
                    setShowPage={setShowPage}
                />
                <Button_sm
                    title={"New"}
                    color={"text-white"}
                    bg_color={"bg-content-blue"}
                    width={"w-[80%]"}
                    className={"m-auto block"}
                    onClick={modalHandler}
                />
                {pageRender(showPage)}
            </div>
            {showModal && < CompanyModal showModal={showModal} setShowModal={setShowModal}/>}
        </div>
    );
};

export default TopPage;