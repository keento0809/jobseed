import React, {useState} from 'react';
import Button_sm from "../../components/models/Button_sm";
import Text_field_lg from "../../components/models/Text_field_lg";
import InputField from "../../components/models/InputField";
import {BsBuilding} from "react-icons/bs"
import {useCompanyContext} from "../../components/context/companyContext";
import {Company, marker} from "../../types/Company";
import GooglePlace from "../../components/features/user/GooglePlace";


type modalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    name: string,
    jobTitle: string,
    link: string,
    description: string,
    company_id: string,
    location: marker
}

const CompanyEditModal = ({setShowModal, name,jobTitle,link,description,company_id,location}: modalProps) => {

    const [searchPlace, setSearchPlace] = useState<marker>(location)

    const [editCompanyData, setEditCompanyData] = useState<Company>({
        company_id: company_id,
        name: name,
        link: link,
        location: searchPlace,
        jobTitle: jobTitle,
        salary: "",
        description: description,
        status: 0,
        interest: 0
    })

    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditCompanyData({...editCompanyData, [e.target.name]: e.target.value});
    }

    const sendEditData = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(editCompanyData)
        setShowModal(false)
    }

    return (
        <div className="bg-modal">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <BsBuilding size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Edit company</h1>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-8">
                    <InputField
                        type={"text"}
                        title={"company name"}
                        name={"name"}
                        value={editCompanyData.name}
                        placeholder={"company name"}
                        onChange={companyDataHandler}
                    />
                    <div>
                        <InputField
                            type={"text"}
                            title={"job title"}
                            name={"jobTitle"}
                            value={editCompanyData.jobTitle}
                            placeholder={"job title"}
                            onChange={companyDataHandler}
                        />

                    </div>
                </div>
                <InputField
                    type={"text"}
                    title={"job post link"}
                    name={"link"}
                    value={editCompanyData.link}
                    placeholder={"job post link"}
                    onChange={companyDataHandler}
                />

                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        type={"text"}
                        title={"salary"}
                        name={"salary"}
                        value={editCompanyData.salary}
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
                <Text_field_lg
                    name={"description"}
                    onChange={companyDataHandler}
                    value={editCompanyData.description}
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