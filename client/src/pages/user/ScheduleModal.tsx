import React, {useState} from 'react';
import {SlCalender} from "react-icons/sl";
import InputField from "../../components/models/InputField";
import Dropdown from "../../components/models/Dropdown";
import Text_field_lg from "../../components/models/Text_field_lg";
import Button_sm from "../../components/models/Button_sm";
import DatePicker from "react-datepicker";
import { useScheduleContext} from "../../components/context/scheduleContext";

type Props = {
    showScheduleModal: boolean;
    setShowScheduleModal : React.Dispatch<React.SetStateAction<boolean>>;

}


const ScheduleModal = ({showScheduleModal, setShowScheduleModal}: Props) => {



    return (
        <div className="bg-modal">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <SlCalender size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Add schedule</h1>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-8">
                    <InputField
                        type={"text"}
                        title={"title"}
                        name={"title"}
                        value={""}
                        placeholder={"title"}
                        // onChange={companyDataHandler}
                    />
                    <InputField
                        type={"date"}
                        title={"date"}
                        name={"date"}
                        value={""}
                        // onChange={companyDataHandler}
                    />
                </div>
                <input type="checkbox" id="allDay" name="allDay" value="day" />
                <label htmlFor="allDay"> all day</label>


                <div className="flex justify-end gap-2 mt-4">
                    <Button_sm
                        title={"create"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-24"}
                        // onClick={createSchedule}
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