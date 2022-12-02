import React, {useEffect, useState} from 'react';
import Button_sm from "../../components/models/Button_sm";
import Text_field_lg from "../../components/models/Text_field_lg";
import InputField from "../../components/models/InputField";
import {BsBuilding} from "react-icons/bs"
import {useCompanyContext} from "../../components/context/companyContext";
import {Company, Location} from "../../types/Company";
import GooglePlace from "../../components/features/user/GooglePlace";


type modalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyModal = ({showModal, setShowModal}: modalProps) => {
    const {createCompany} = useCompanyContext();
    const [location, setLocation] = useState<Location>({lat: 49.246292, lng: -123.116226})
    const [companyData, setCompanyData] = useState<Company>({
        name: "",
        link: "",
        location,
        jobtype: "",
        company_size: "",
        salary: "",
        description: "",
        interest: 0
    })

    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setCompanyData({...companyData, [e.target.name]: e.target.value});
    }

    const sendCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createCompany(companyData)
        console.log(companyData)
        setShowModal(false)
        window.location.reload()
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
                        value={companyData.salary}
                        placeholder={"salary"}
                        onChange={companyDataHandler}
                    />
                    <GooglePlace
                        location={companyData.location}
                        companyData={companyData}
                        setLocation={setLocation}
                        setCompanyData = {setCompanyData}
                    />
                </div>
                <div>
                    <InputField
                        type={"text"}
                        title={"company size"}
                        name={"company_size"}
                        value={companyData.company_size}
                        placeholder={"company size"}
                        onChange={companyDataHandler}
                    />
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