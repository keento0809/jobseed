import React, {useState} from 'react';
import {SlCalender} from "react-icons/sl";
import InputField from "../../components/models/InputField";
import Text_field_lg from "../../components/models/Text_field_lg";
import Button_sm from "../../components/models/Button_sm";
import {Schedule} from "../../types/Schedule";
import DateTimePicker from "../../components/models/DateTimePicker";

type Props = {
    setShowScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const ScheduleModal = ({setShowScheduleModal}: Props) => {
    const companyDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewSchedule({...newSchedule, [e.target.name]: e.target.value});
    }

    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let today = `${year}-${month}-${day}`

    const [newSchedule, setNewSchedule] = useState<Schedule>(
        {
            title: "",
            date: {startDate: today, startTime: "00:00"},
            endDate: {endDate: today, endTime: "00:00"},
            timeInclude: false,
        }
    )

    const startDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSchedule({...newSchedule, date: {...newSchedule.date, [e.target.name]: e.target.value}})
    }

    const endDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSchedule({...newSchedule, date: {...newSchedule.date, [e.target.name]: e.target.value}})
    }

    const handleAllDay = () => {
        setNewSchedule({...newSchedule, "timeInclude": !newSchedule.timeInclude})
    }

    const createSchedule = () => {
        console.log(newSchedule)
    }

    return (
        <div className="bg-modal">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <SlCalender size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Add schedule</h1>
                </div>
                <InputField
                    type={"text"}
                    title={"title"}
                    name={"title"}
                    value={newSchedule.title}
                    placeholder={"title"}
                    onChange={companyDataHandler}
                    className={"md:col-span-4 mt-4"}
                />
                <DateTimePicker
                    title={"Start date"}
                    dateName={"startDate"}
                    timeName={"startTime"}
                    timeInclude={newSchedule.timeInclude}
                    dateValue={newSchedule.date.startDate!}
                    timeValue={newSchedule.date.startTime!}
                    dateOnChange={startDateHandler}
                    timeOnChange={startDateHandler}
                />
                <DateTimePicker
                    title={"End date"}
                    dateName={"endDate"}
                    timeName={"endTime"}
                    timeInclude={newSchedule.timeInclude}
                    dateValue={newSchedule.endDate.endDate!}
                    timeValue={newSchedule.endDate.endTime!}
                    dateOnChange={endDateHandler}
                    timeOnChange={endDateHandler}
                />
                <label className="block mt-6">
                    <input
                        type="checkbox"
                        name="timeInclude"
                        checked={newSchedule.timeInclude}
                        onChange={handleAllDay}
                    />
                    <span className="pl-2 font-thin">Include time</span>
                </label>
                <Text_field_lg
                    name={"description"}
                    onChange={companyDataHandler}
                    value={newSchedule.description}
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