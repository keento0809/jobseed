import React, {ReactNode, useEffect, useState} from 'react';
import UserNav from "../../components/features/user/UserNav";
import Interested from "../../components/features/user/Company page/Interested";
import Applied from "../../components/features/user/Company page/Applied";
import Rejected from "../../components/features/user/Company page/Rejected";
import Interview from "../../components/features/user/Company page/Interview";
import UserProfile from "../../components/features/user/UserProfile";
import human from "../../images/human.png";
import Button_sm from "../../components/models/Button_sm";
import CompanyModal from "./CompanyModal";
import Search from "../../components/models/Search";
import {useCompanyContext} from "../../components/context/companyContext";
import {useCookies} from "react-cookie";
import {useAuthContext} from "../../components/context/AuthContext";
import {useCompaniesContext} from "../../components/context/companiesContext";
import {useFetchCompany} from "../../hooks/useFetchCompany";

const TopPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [cookies] = useCookies();
    const {companyState, filteredChildren, setFilteredChildren} = useCompaniesContext();
    const {seekerState} = useAuthContext();
    const {companies} = companyState
    const [childComponent, setChildComponent] = useState<ReactNode>(<Interested/>)
    const {
        showPage,
        setShowPage,
    } = useCompanyContext()

    useFetchCompany({
        method: "get",
        url: `/companies/${seekerState.seeker.seeker_id}`,
        headers: {
            authorization:`Bearer ${cookies.JWT_TOKEN}`
        },
        withCredentials : true
    })

    console.log(companies)

    const modalHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        showModal ? setShowModal(false) : setShowModal(true)
    }

    useEffect(() => {
        switch (showPage) {
            case "Interested":
                setChildComponent(<Interested/>)
                break
            case "Applied":
                setChildComponent(<Applied/>)
                break
            case "Interview":
                setChildComponent(<Interview/>)
                break
            case "Rejected":
                setChildComponent(<Rejected/>)
                break
            default:
                return
        }
    }, [showPage])

    return (
            <div className="wrapper lg:grid grid-cols-5 gap-2 min-h-screen">
                < UserProfile
                    name={seekerState.seeker.name}
                    email={seekerState.seeker.email}
                    avatar={human}
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
                    {companyState.loading? <h1>Loading</h1> : childComponent}
                </div>
                {showModal && < CompanyModal showModal={showModal} setShowModal={setShowModal}/>}
            </div>
    );
};

export default TopPage;
