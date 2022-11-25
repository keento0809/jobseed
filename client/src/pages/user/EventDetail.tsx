import React from 'react';
import {EventClickArg} from "@fullcalendar/react";
import {IoMdClose} from "react-icons/io";
import {MdModeEditOutline} from "react-icons/md";
import {BsTrash} from "react-icons/bs"

type EventDetailProps = {
    selectedEvent: EventClickArg
}

const EventDetail = ({selectedEvent}: EventDetailProps) => {
    console.log(selectedEvent.event)

    const getDay = (day: Date, start: boolean) => {
        const date = day.toString().slice(0, 9)
        const time = day.toLocaleTimeString().slice(0, 1)
        const period = day.toLocaleTimeString().slice(-2)
        const year = day.getFullYear()
        return <p>{start ? "Start:" : "End: "} {date}, {year} {time}{period}</p>
    }

    return (
        <div className="w-[80%] h-[25%] px-6 py-3 border mt-2  shadow-xl font-thin bg-white rounded-xl flex">
            <div className="grid grid-cols-10 w-full">
                <div className="col-span-1 flex justify-center pt-2">
                    <div className="h-[14px] w-[14px] bg-[#257e4a] rounded-md "></div>
                </div>
                <div className="col-span-9">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold">{selectedEvent.event._def.title}</h3>
                        <div className="flex justify-end">
                            < MdModeEditOutline
                                onClick={()=> {console.log("Hi")}}
                                size={30} className="p-2 block cursor-pointer rounded-full hover:bg-slate-300"
                            />
                            < BsTrash
                                onClick={()=> {console.log("Hi")}}
                                size={30} className="block p-2 cursor-pointer rounded-full hover:bg-slate-300"
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <p className="text-sm">{selectedEvent.event._def.allDay ? null : getDay(selectedEvent.event._instance?.range.start!, true)}</p>
                        <p className="text-sm">{selectedEvent.event._instance?.range.end ? getDay(selectedEvent.event._instance?.range.end!, false) : null}</p>
                    </div>
                    <p className="text-sm">Subject: {selectedEvent.event._def.extendedProps.description}</p>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;