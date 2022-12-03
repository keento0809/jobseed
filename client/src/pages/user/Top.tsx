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
import {useSeekerContext} from "../../components/context/seekerContext";
import axios from "axios";
import {useCookies} from "react-cookie";

const TopPage = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const {companies, filteredChildren, setFilteredChildren, showPage, setShowPage, setCompanies} = useCompanyContext()
    const [childComponent, setChildComponent] = useState<ReactNode>(<Interested/>)
    const {seeker, loadingSeeker, setLoadingSeeker} = useSeekerContext();
    const [cookies] = useCookies();
    const {getSeekerData} = useSeekerContext()
    const [cookie] = useCookies();

    useEffect(() => {
        const firstRender = async () => {
            try {
                console.log(seeker)
                let res = await axios({
                    method: "get",
                    url: `http://localhost:8080/companies/${seeker!.seeker_id}/Interested`,
                    headers: {
                        authorization: `Bearer ${cookies.JWT_TOKEN}`
                    },
                    withCredentials: true
                })
                setCompanies(res.data.companiesWithStatus);
                setChildComponent(<Interested/>)
            } catch (e: any) {
                console.log(e)
            }
        }
        firstRender()
    }, [])

    useEffect(() => {
        const pageRender = async () => {
            if (showPage === "Interested") {
                try {
                    let res = await axios({
                        method: "get",
                        url: `http://localhost:8080/companies/${seeker!.seeker_id}/Interested`,
                        headers: {
                            authorization: `Bearer ${cookies.JWT_TOKEN}`
                        },
                        withCredentials: true
                    })
                    setCompanies(res.data.companiesWithStatus);
                } catch (err: any) {
                    console.log(err)
                }
                setChildComponent(<Interested/>)
            } else if (showPage === "Applied") {
                try {
                    let res = await axios({
                        method: "get",
                        url: `http://localhost:8080/companies/${seeker!.seeker_id}/Applied`,
                        headers: {
                            authorization: `Bearer ${cookies.JWT_TOKEN}`
                        },
                        withCredentials: true
                    })
                    setCompanies(res.data.companiesWithStatus);
                } catch (err: any) {
                    console.log(err)
                }
                setChildComponent(<Applied/>)
            } else if (showPage === "Interview") {
                try {
                    let res = await axios({
                        method: "get",
                        url: `http://localhost:8080/companies/${seeker!.seeker_id}/Interview`,
                        headers: {
                            authorization: `Bearer ${cookies.JWT_TOKEN}`
                        },
                        withCredentials: true
                    })
                    setCompanies(res.data.companiesWithStatus);
                } catch (err: any) {
                    console.log(err)
                }
                setChildComponent(<Interview/>)
            } else if (showPage === "Rejected") {
                try {
                    let res = await axios({
                        method: "get",
                        url: `http://localhost:8080/companies/${seeker!.seeker_id}/Rejected`,
                        headers: {
                            authorization: `Bearer ${cookies.JWT_TOKEN}`
                        },
                        withCredentials: true
                    })
                    setCompanies(res.data.companiesWithStatus);
                } catch (err: any) {
                    console.log(err)
                }
                setChildComponent(<Rejected/>)
            } else {
                return
            }
        }
        pageRender()
    }, [showPage, seeker!.seeker_id])

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
