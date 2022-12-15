import React, {useEffect, useRef, useState} from 'react';
import {EventClickArg} from "@fullcalendar/react";
import {SlCalender} from "react-icons/sl";
import InputField from "../../components/models/InputField";
import ColorPicker from "../../components/features/user/ColorPicker";
import Text_field_lg from "../../components/models/Text_field_lg";
import Button_sm from "../../components/models/Button_sm";
import {Schedule} from "../../types/Schedule";
import {useScheduleContext} from "../../components/context/scheduleContext";

type EventDetailProps = {
    selectedEvent: EventClickArg;
    setShowScheduleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleEditModal = ({selectedEvent, setShowScheduleEditModal}: EventDetailProps) => {

    const initStartDate = selectedEvent.event.startStr.slice(0,10)
    const initEndDate = selectedEvent.event.endStr.slice(0,10)
    const initStartTime = selectedEvent.event.startStr.slice(11, 16)
    const initEndTime = selectedEvent.event.endStr.slice(11, 16)

    const { updateSchedule } = useScheduleContext()

    const [startDate, setStartDate] = useState<string>(initStartDate)
    const [startTime, setStartTime] = useState<string>(initStartTime)
    const [finishDate, setFinishDate] = useState<string>(initEndDate)
    const [finishTime, setFinishTime] = useState<string>(initEndTime)

    const [editSchedule, setEditSchedule] = useState<Schedule>({
        seeker_id: selectedEvent.event._def.extendedProps.seeker_id,
        company_id: selectedEvent.event._def.extendedProps.company_id,
        title: selectedEvent.event._def.title,
        date:startDate + "T" + startTime,
        endDate:finishDate + "T" + finishTime,
        color: selectedEvent.event._def.ui.backgroundColor,
        description: selectedEvent.event._def.extendedProps.description,
        allDay: selectedEvent.event.allDay
    })

    const [showColorPallet, setShowColorPallet] = useState<boolean>(false)

    const editScheduleHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditSchedule({...editSchedule, [e.target.name]: e.target.value})
    }

    const colorHandler = (e: React.MouseEvent<HTMLElement>) => {
        setEditSchedule({...editSchedule, color: e.currentTarget.id})
        setShowColorPallet(false)
    }

    const updateScheduleHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        updateSchedule(selectedEvent.event._def.extendedProps.schedule_id, editSchedule)
        setShowScheduleEditModal(false)
    }

    useEffect(() => {
        let startFullDate = startDate + "T" + startTime
        setEditSchedule({...editSchedule, date: startFullDate})
    }, [startDate, startTime])

    useEffect(() => {
        let finishFullDate = finishDate + "T" + finishTime
        setEditSchedule({...editSchedule, endDate: finishFullDate})
    }, [finishDate, finishTime])


    return (
        <div className="bg-modal relative z-[1001]">
            <div className="modal-container wrapper py-6">
                <div className="flex items-center">
                    <SlCalender size={20} className="mr-4"/>
                    <h1 className="text-lg font-bold">Edit schedule</h1>
                </div>
                <InputField
                    type={"text"}
                    title={"title"}
                    name={"title"}
                    value={editSchedule.title}
                    placeholder={"title"}
                    onChange={editScheduleHandler}
                    className={"md:col-span-4 mt-4"}
                />
                <div>
                    <h3 className="text-sm my-2">Start date</h3>
                    <div className="flex gap-2">
                        <input
                            className="font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={"date"}
                            value={startDate}
                            id={"date"}
                            onChange={(e) => {setStartDate(e.target.value)}}
                        />
                        <input
                            className={`${editSchedule.allDay ? null : "hidden"} font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type={"time"}
                            id={"time"}
                            value={startTime}
                            onChange={(e) => {setStartTime(e.target.value)}}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm my-2">End date</h3>
                    <div className="flex gap-2">
                        <input
                            className="font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={"date"}
                            value={finishDate}
                            onChange={(e) => setFinishDate(e.target.value)}
                        />
                        <input
                            className={`${editSchedule.allDay ? null : "hidden"} font-thin shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type={"time"}
                            value={finishTime}
                            onChange={(e)=> setFinishTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center mt-4">
                    <label className="block">
                        <input
                            type="checkbox"
                            name="timeInclude"
                            checked={editSchedule.allDay}
                            onChange={() => {setEditSchedule({...editSchedule, allDay: !editSchedule.allDay})}}
                        />
                        <span className="pl-2 font-thin">Include time</span>
                    </label>
                    <ColorPicker
                        setColor={colorHandler}
                        color={editSchedule.color}
                        showColorPallet={showColorPallet}
                        setShowColorPallet={setShowColorPallet}
                    />
                </div>
                <Text_field_lg
                    name={"description"}
                    onChange={editScheduleHandler}
                    value={editSchedule.description}
                />
                <div className="flex justify-end gap-2 mt-4">
                    <Button_sm
                        title={"Edit"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        width={"w-24"}
                        onClick={updateScheduleHandler}
                    />
                    <Button_sm
                        title={"Close"}
                        color={"bg-content-blue"}
                        bg_color={"bg-white"}
                        width={"w-24"}
                        onClick={() => setShowScheduleEditModal(false)}
                        className={"border-2"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScheduleEditModal;