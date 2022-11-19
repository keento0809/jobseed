import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from "axios";
import {Schedule} from "../../types/Schedule";


type Props = {
    children: ReactNode
};

type scheduleContext = {
    events: Schedule[],
    getSchedule: (id: string) => void,
    createSchedule: (schedule: Schedule) => void,
    editSchedule: (id: string, data: Schedule) => void,
    deleteSchedule: (id: string) => void
}

const scheduleContext = createContext({} as scheduleContext);

export const useScheduleContext = () => {
    return useContext(scheduleContext)
}

export const ScheduleProvider = ({children}: Props) => {

    const [events, setEvents] = useState<Schedule[]>([]);

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
            setEvents(res.data)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const editSchedule = async (schedule_id: string, newSchedule: Schedule) => {
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
        <scheduleContext.Provider value={{events,getSchedule, createSchedule, editSchedule,deleteSchedule}}>
            {children}
        </scheduleContext.Provider>
    )
}