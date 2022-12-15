import React, {useEffect, useState} from 'react';
import Button_sm from "../../components/models/Button_sm";
import Text_field_lg from "../../components/models/Text_field_lg";
import InputField from "../../components/models/InputField";
import {BsBuilding} from "react-icons/bs"
import {Company, Location} from "../../types/Company";
import GooglePlace from "../../components/features/user/GooglePlace";
import axios from "axios";
import {useAuthContext} from "../../components/context/AuthContext";
import {COMPANY_ACTIONS} from "../../components/context/reducer/CompanyReducer";
import {useCompaniesContext} from "../../components/context/companiesContext";
import {getLat, getLng} from "../../components/helper/companyHelper";
import useDetectClickOutside from "../../hooks/useDetectClickOutside";
import CompanySizeDropDown from "../../components/features/user/Company page/CompanySizeDropDown";


type modalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const company_size = ["1-10", "11-50", "50-200","201-500", "501-1000", "1001-"]

const CompanyModal = ({showModal, setShowModal}: modalProps) => {
    const {seekerState} = useAuthContext();
    const {dispatch} = useCompaniesContext();
    const [location, setLocation] = useState<Location>({lat: 49.246292, lng: -123.116226})
    const {ref, isComponentVisible, setIsComponentVisible} = useDetectClickOutside({initialVisible: false})
    const [companyData, setCompanyData] = useState<Company>({
        name: "",
        link: "",
        location,
        jobtype: "",
        company_size: "",
        salary: "",
        description: "",
        interest: 0,
        seeker_id: seekerState.seeker.seeker_id!
    })

    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setCompanyData({...companyData, [e.target.name]: e.target.value});
    }

    const sendCompany = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            dispatch({type: COMPANY_ACTIONS.API_CALL, payload: []})
            let res = await axios({
                method: "post",
                url: "http://localhost:8080/companies/new",
                data: companyData,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${seekerState.token}`
                }
            })

            let getData = await axios({
                method: "get",
                url: `http://localhost:8080/companies/${seekerState.seeker.seeker_id}`,
                headers: {
                    authorization:`Bearer ${seekerState.token}`
                },
                withCredentials : true
            })
            const comp : any[] = getData.data.companies
            comp.forEach( c => {
                c.location = {lat: parseFloat(
                    getLat(c.location)), lng:  parseFloat(getLng(c.location))}
            })
            res.status === 200 && dispatch({type: COMPANY_ACTIONS.SUCCESS, payload: comp})
        } catch (e: any) {
            console.log(e)
        }
        setShowModal(false)
    }

    const handleSetCompany = (e: React.MouseEvent<HTMLLIElement>) => {
        setCompanyData({...companyData, company_size: e.currentTarget.innerText})
        setIsComponentVisible(false)
    }

    return (
        <div className="bg-modal relative z-[1001]">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <BsBuilding size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Add company</h1>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-8">
                    <InputField
                        type={"text"}
                        title={"company name"}
                        name={"name"}
                        value={companyData.name}
                        placeholder={"company name"}
                        onChange={companyDataHandler}
                    />
                    <div>
                        <InputField
                            type={"text"}
                            title={"job type"}
                            name={"jobtype"}
                            value={companyData.jobtype}
                            placeholder={"job type"}
                            onChange={companyDataHandler}
                        />
                    </div>
                </div>
                <InputField
                    type={"text"}
                    title={"job post link"}
                    name={"link"}
                    value={companyData.link}
                    placeholder={"job post link"}
                    onChange={companyDataHandler}
                />

                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        type={"text"}
                        title={"salary"}
                        name={"salary"}
                        value={companyData.salary!}
                        placeholder={"salary"}
                        onChange={companyDataHandler}
                    />
                    <GooglePlace
                        location={companyData.location}
                        companyData={companyData}
                        setLocation={setLocation}
                        setCompanyData={setCompanyData}
                    />
                </div>
                <div className="text-sm relative">
                    <p>company size</p>
                    <div
                        className="cursor-pointer text-gray-400 text-sm font-thin shadow border rounded w-1/2 py-2 px-3 mt-2 leading-tight focus:shadow-outline"
                        onClick={() => setIsComponentVisible(true)}>
                        {companyData.company_size.length===0 ? "0-" : companyData.company_size}
                    </div>
                    {isComponentVisible && <CompanySizeDropDown onClick={handleSetCompany}/>}
                </div>
                <Text_field_lg
                    name={"description"}
                    onChange={companyDataHandler}
                />
                <div className="flex justify-end gap-2 mt-4">
                    <Button_sm
                        title={"create"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-24"}
                        onClick={sendCompany}
                    />
                    <Button_sm
                        title={"close"}
                        color={"bg-content-blue"}
                        bg_color={"bg-white"}
                        width={"w-24"}
                        onClick={() => setShowModal(false)}
                        className={"border-2"}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompanyModal;