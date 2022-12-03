import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios from "axios";
import {CalenderEvent, Schedule} from "../../types/Schedule";
import {useCookies} from "react-cookie";
import {Company} from "../../types/Company";


type Props = {
    children: ReactNode
};

type scheduleContext = {
    events: any[] | undefined,
    setEvents: React.Dispatch<React.SetStateAction<any[]>>;
    getSchedule: (id: string) => void,
    createSchedule: (schedule: any) => void,
    updateSchedule: (id: string, data: Schedule) => void,
    deleteSchedule: (id: string) => void
}

const scheduleContext = createContext({} as scheduleContext);

export const useScheduleContext = () => {
    return useContext(scheduleContext)
}

export const ScheduleProvider = ({children}: Props) => {

    const [events, setEvents] = useState<any[]>([]);
    const [cookies] = useCookies();

    const getSchedule = async (seeker_id: string) => {
        try {
            let res = await axios({
                method: "get",
                url: `http://localhost:8080/schedules/allSchedules/${seeker_id}`,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            setEvents(res.data.schedules)
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const createSchedule = async (data: any) => {
        try {
            let res = await axios({
                method: "post",
                url: `http://localhost:8080/schedules/new`,
                data,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            console.log(res.data)
        } catch (e: any) {
            console.log(e)
        }
    }

    const updateSchedule = async (schedule_id: string, newSchedule: Schedule) => {
        try {
            let res = await axios({
                method:"put",
                url: `http://localhost:8080/schedules/${schedule_id}`,
                data: newSchedule,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            console.log(res.data)
            // setEvents(res.data)
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
        <scheduleContext.Provider value={{events,setEvents,getSchedule, createSchedule, updateSchedule,deleteSchedule}}>
            {children}
        </scheduleContext.Provider>
    )
}