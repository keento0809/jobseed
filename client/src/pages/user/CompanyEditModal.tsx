import React, {useState} from 'react';
import Button_sm from "../../components/models/Button_sm";
import Text_field_lg from "../../components/models/Text_field_lg";
import InputField from "../../components/models/InputField";
import {BsBuilding} from "react-icons/bs"
import {Company, Location} from "../../types/Company";
import GooglePlace from "../../components/features/user/GooglePlace";
import axios from "axios";
import {useAuthContext} from "../../components/context/AuthContext";
import {useCompaniesContext} from "../../components/context/companiesContext";
import {COMPANY_ACTIONS} from "../../components/context/reducer/CompanyReducer";
import {getLat, getLng} from "../../components/helper/companyHelper";
import useDetectClickOutside from "../../hooks/useDetectClickOutside";

type modalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    name: string,
    jobtype: string,
    link: string,
    description: string,
    company_id: string,
    company_size: string,
    location: Location,
    status: string,
    salary: string
}

const CompanyEditModal = ({setShowModal, status,name, jobtype,link,description,company_id, company_size,location, salary}: modalProps) => {

    const [searchPlace, setSearchPlace] = useState<Location>(location)
    const [showDropDown, setShowDropDown] = useState<boolean>(false)
    const {seekerState} = useAuthContext();
    const {dispatch} = useCompaniesContext();
    const {ref, isComponentVisible, setIsComponentVisible} = useDetectClickOutside({initialVisible: false})
    const [editCompanyData, setEditCompanyData] = useState<Company>({
        company_id,
        name,
        link,
        location,
        company_size,
        jobtype,
        status,
        salary,
        description,
        seeker_id: seekerState.seeker.seeker_id!
    })

    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditCompanyData({...editCompanyData, [e.target.name]: e.target.value});
    }

    const sendEditData =　async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            dispatch({type: COMPANY_ACTIONS.API_CALL, payload: []})
            let res = await axios({
                method: "patch",
                url: `http://localhost:8080/companies/${seekerState.seeker.seeker_id}/${company_id}`,
                data: editCompanyData,
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
        } catch (err: any) {
            console.log(err)
        }
        setShowModal(false)
    }



    return (
        <div className="bg-modal relative z-[1001]">
            <div ref={ref} className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <BsBuilding size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Edit company</h1>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-8">
                    <InputField
                        type={"text"}
                        title={"company name"}
                        name={"name"}
                        value={editCompanyData.name || ""}
                        placeholder={"company name"}
                        onChange={companyDataHandler}
                    />
                    <div>
                        <InputField
                            type={"text"}
                            title={"job type"}
                            name={"jobtype"}
                            value={editCompanyData.jobtype! || ""}
                            placeholder={"job type"}
                            onChange={companyDataHandler}
                        />

                    </div>
                </div>
                <InputField
                    type={"text"}
                    title={"job post link"}
                    name={"link"}
                    value={editCompanyData.link! || ""}
                    placeholder={"job post link"}
                    onChange={companyDataHandler}
                />

                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        type={"text"}
                        title={"salary"}
                        name={"salary"}
                        value={editCompanyData.salary! || ""}
                        placeholder={"salary"}
                        onChange={companyDataHandler}
                    />
                    <GooglePlace
                        location={searchPlace}
                        companyData={editCompanyData}
                        setLocation={setSearchPlace}
                        setCompanyData={setEditCompanyData}
                    />
                </div>

                <div>
                    <InputField
                        type={"text"}
                        title={"company size"}
                        name={"company_size"}
                        value={editCompanyData.company_size! || ""}
                        placeholder={"company size"}
                        onChange={companyDataHandler}
                    />

                </div>


                <Text_field_lg
                    name={"description"}
                    onChange={companyDataHandler}
                    value={editCompanyData.description! || ""}
                />
                <div className="flex justify-end gap-2 mt-4">
                    <Button_sm
                        title={"create"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-24"}
                        onClick={sendEditData}
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

export default CompanyEditModal;