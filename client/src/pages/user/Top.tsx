import React, {useState} from 'react';
import UserNav from "../../components/features/user/UserNav";
import Interested from "../../components/features/user/Interested";
import Applied from "../../components/features/user/Applied";
import Rejected from "../../components/features/user/Rejected";
import Interview from "../../components/features/user/Interview";
import UserProfile from "../../components/features/user/UserProfile";
import human from "../../images/human.png";
import Button_sm from "../../components/models/Button_sm";
import CompanyModal from "./CompanyModal";
import Search from "../../components/models/Search";
import {useCompanyContext} from "../../components/context/companyContext";
import {useSeekerContext} from "../../components/context/seekerContext";

const TopPage = () => {
    const [showPage, setShowPage] = useState<string>("interested")
    const [showModal, setShowModal] = useState<boolean>(false);
    const { getCompaniesByStatus } = useCompanyContext();
    const { seeker } = useSeekerContext()

    const pageRender = (showPage: string) => {
        switch (showPage) {
            case "interested":
                // getCompaniesByStatus(seeker!.seeker_id, "Interested")
                return < Interested/>
            case "applied":
                // getCompaniesByStatus(seeker!.seeker_id, "Applied")
                return < Applied/>
            case "interview":
                // getCompaniesByStatus(seeker!.seeker_id, "Interview")
                return < Interview/>
            case "rejected":
                // getCompaniesByStatus(seeker!.seeker_id, "Rejected")
                return < Rejected/>
        }
    }

    const modalHandler = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        showModal === true ? setShowModal(false) : setShowModal(true)
    }



    return (
        <div className="wrapper lg:grid grid-cols-5 gap-2 min-h-screen">
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
                <div className="lg:grid lg:grid-cols-9 lg:gap-4 mt-4">
                    < Search />
                    <Button_sm
                        title={"New"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-full my-2 lg:my-0"}
                        className={"block col-span-2"}
                        onClick={modalHandler}
                    />
                </div>
                {pageRender(showPage)}
            </div>
            {showModal && < CompanyModal showModal={showModal} setShowModal={setShowModal}/>}
        </div>
    );
};

export default TopPage;
