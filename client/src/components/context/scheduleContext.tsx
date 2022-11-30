import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from "axios";
import {CalenderEvent, Schedule} from "../../types/Schedule";


type Props = {
    children: ReactNode
};

type scheduleContext = {
    events: any[],
    getSchedule: (id: string) => void,
    createSchedule: (schedule: Schedule) => void,
    updateSchedule: (id: string, data: Schedule) => void,
    deleteSchedule: (id: string) => void
}

const scheduleContext = createContext({} as scheduleContext);

export const useScheduleContext = () => {
    return useContext(scheduleContext)
}

export const ScheduleProvider = ({children}: Props) => {

    const [events, setEvents] = useState([{
        schedule_id: "100000",
        seeker_id: "1",
        company_id: "2",
        title: "Hi",
        allDay: false,
        date: "2022-11-21T13:00:00",
        end: "2022-11-21T16:00:00",
        backgroundColor: "#257e4a",
        description: "dsadsadsasasadsadsadsadsadsa"
    }]);

    const getSchedule = async (seeker_id: string) => {
        try {
            let res = await axios.get(`http://localhost:8080/schedules/${seeker_id}`)
            setEvents(res.data)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const createSchedule = async (data: Schedule) => {
        try {
            let res = await axios.post("http://localhost:8080/schedules/new", data)
            console.log(res.data)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const updateSchedule = async (schedule_id: string, newSchedule: Schedule) => {
        try {
            let res = await axios.patch(`http://localhost:8080/schedules/${schedule_id}`, newSchedule)
            setEvents(res.data)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const deleteSchedule = async (schedule_id: string) => {
        try {
            await axios({
                method: "delete",
                url: `http://localhost:8080/schedules/${schedule_id}`
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    return(
        <scheduleContext.Provider value={{events,getSchedule, createSchedule, updateSchedule,deleteSchedule}}>
            {children}
        </scheduleContext.Provider>
    )
}