import React, {ReactNode, useEffect, useState} from 'react';
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
import {useNavigate} from "react-router-dom";

const TopPage = () => {
    const [showPage, setShowPage] = useState<string>("Interested");
    const [showModal, setShowModal] = useState<boolean>(false);
    const {getCompaniesByStatus} = useCompanyContext();
    const {companies, filteredChildren, setFilteredChildren} = useCompanyContext()
    const [childComponent, setChildComponent] = useState<ReactNode>(<Interested companies={companies}/>)
    const {seeker} = useSeekerContext();

    useEffect(() => {
        const pageRender = (showPage: string) => {
            if (seeker!.seeker_id) {
                switch (showPage) {
                    case "Interested":
                        getCompaniesByStatus(seeker!.seeker_id, "Interested")
                        setChildComponent(<Interested companies={companies}/>)
                        break;
                    case "Applied":
                        getCompaniesByStatus(seeker!.seeker_id, "Applied")
                        setChildComponent(<Applied companies={companies}/>)
                        break;
                    case "Interview":
                        getCompaniesByStatus(seeker!.seeker_id, "Interview")
                        setChildComponent(<Interview companies={companies}/>)
                        break;
                    case "Rejected":
                        getCompaniesByStatus(seeker!.seeker_id, "Rejected")
                        setChildComponent(<Rejected companies={companies}/>)
                        break;
                    default:
                }
            } else return null
        }
        pageRender(showPage)

    }, [showPage])

    const modalHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        showModal ? setShowModal(false) : setShowModal(true)
    }

    return (
        <div className="wrapper lg:grid grid-cols-5 gap-2 min-h-screen">
            < UserProfile
                name={seeker!.name}
                email={seeker!.email}
                avatar={seeker!.avatar ? seeker!.avatar : human}
            />
            <div className="lg:col-span-4">
                <UserNav
                    showPage={showPage}
                    setShowPage={setShowPage}
                />
                <div className="lg:grid lg:grid-cols-9 lg:gap-4 mt-4">
                    < Search
                        filteredChildren={filteredChildren}
                        setFilteredChildren={setFilteredChildren}
                    />
                    <Button_sm
                        title={"New"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-full my-2 lg:my-0"}
                        className={"block col-span-2"}
                        onClick={modalHandler}
                    />
                </div>
                {childComponent}
            </div>
            {showModal && < CompanyModal showModal={showModal} setShowModal={setShowModal}/>}
        </div>
    );
};

export default TopPage;
