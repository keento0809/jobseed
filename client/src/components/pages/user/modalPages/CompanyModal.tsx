import React, {useState} from 'react';
import Dropdown from "../../../models/Dropdown";
import Button_sm from "../../../models/Button_sm";
import Text_field_lg from "../../../models/Text_field_lg";
import InputField from "../../../models/InputField";
import {BsBuilding} from "react-icons/bs"
import {Company, useCompanyContext} from "../../../context/companyContext";

type modalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyModal = ({showModal, setShowModal}: modalProps) => {
    const { createCompany } = useCompanyContext();
    const [companyScale, setCompanyScale] = useState<string>("");
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [companyData, setCompanyData] = useState<Company>({
        company_id: "",
        name: "",
        size: "",
        link: "",
        location:"",
        jobType: "",
        salary:"",
        description: "",
        status:0,
        interest:0
    })

    const employeesList = [
        "1-10", "11-50", "51-200", "201-500", "501-1,000", "1,001-5,000", "5,001-10,000", "10,000-"
    ]

    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
        setCompanyData({...companyData, [e.target.name]: e.target.value});
    }

    const sendCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(companyData)
        // createCompany(companyData)
        setShowModal(false)
    }

    return (
        <div className="bg-modal">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <BsBuilding size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Add company</h1>
                </div>
                <div className="flex">
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
                            title={"company size"}
                            name={"size"}
                            value={companyData.size}
                            placeholder={"company size"}
                            onChange={companyDataHandler}
                        />
                        <Dropdown
                            label={"employees"}
                            itemList={employeesList}
                            showDropDown={showDropDown}
                            setShowDropDown={setShowDropDown}
                            setCompanyScale={setCompanyScale}
                        />
                    </div>
                </div>
                <InputField
                    type={"text"}
                    title={"company url"}
                    name={"link"}
                    value={companyData.link}
                    placeholder={"company url"}
                    onChange={companyDataHandler}
                />

                <div className="flex">
                    <InputField
                        type={"text"}
                        title={"salary"}
                        name={"salary"}
                        value={companyData.salary}
                        placeholder={"salary"}
                        onChange={companyDataHandler}
                    />
                    <div>
                        <InputField
                            type={"text"}
                            title={"location"}
                            name={"location"}
                            value={companyData.location}
                            placeholder={"location"}
                            onChange={companyDataHandler}
                        />
                    </div>
                </div>
                <Text_field_lg
                    name={"description"}
                    onChange={companyDataHandler}
                />
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
    );
};

export default CompanyModal;