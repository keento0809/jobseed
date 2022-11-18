import React, {createContext, ReactNode, useState} from 'react';
import axios from "axios";


type Props = {
    children: ReactNode
};

export type Schedule = {
    title: string;
    date: string;
    allDay: boolean;
    start?: string;
    end?: string;
    backendColor?: string;
    description: string;
}

type scheduleContext = {
    getSchedule: (id: string) => void,
    createSchedule: (schedule: Schedule) => void,
    editSchedule: (id: string, data: Schedule) => void,
    deleteSchedule: (id: string) => void
}

const scheduleContext = createContext({} as scheduleContext);

export const useScheduleContext = ({children}: Props) => {
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
        <scheduleContext.Provider value={{getSchedule, createSchedule, editSchedule,deleteSchedule}}>
            {children}
        </scheduleContext.Provider>
    )
}