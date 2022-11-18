import React, {useState} from 'react';
import {BsBuilding} from "react-icons/bs";
import InputField from "../../components/models/InputField";
import Dropdown from "../../components/models/Dropdown";
import Text_field_lg from "../../components/models/Text_field_lg";
import Button_sm from "../../components/models/Button_sm";

type Props = {
    showScheduleModal: boolean;
    setShowScheduleModal : React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleModal = ({showScheduleModal, setShowScheduleModal}: Props) => {

    type Schedule = {
        title: string,
        startDate: string;
        endDate: string;
        location?: string;
        description: string;
        completed: boolean
    }

    const [newSchedule, setNewSchedule] = useState<Schedule>({
        title: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        completed: false
    })
    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewSchedule({...newSchedule!, [e.target.name]: e.target.value});
    }

    const createSchedule = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowScheduleModal(false);
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
                        value={newSchedule.title}
                        placeholder={"company name"}
                        onChange={companyDataHandler}
                    />
                    <div>
                        <InputField
                            type={"text"}
                            title={"company size"}
                            name={"size"}
                            value={newSchedule.startDate}
                            placeholder={"company size"}
                            onChange={companyDataHandler}
                        />
                    </div>
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
                        onClick={createSchedule}
                    />
                    <Button_sm
                        title={"close"}
                        color={"bg-content-blue"}
                        bg_color={"bg-white"}
                        width={"w-24"}
                        onClick={() => setShowScheduleModal(false)}
                        className={"border-2"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;