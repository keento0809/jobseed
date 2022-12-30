import React, { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";
import { CalenderEvent, Schedule } from "../../types/Schedule";
import { useCookies } from "react-cookie";

type Props = {
  children: ReactNode;
};

type scheduleContext = {
  events: any[] | undefined;
  setEvents: React.Dispatch<React.SetStateAction<any[]>>;
  getSchedule: (id: string) => void;
  createSchedule: (schedule: any) => void;
  updateSchedule: (id: string, data: Schedule) => void;
  deleteSchedule: (id: string) => void;
};

const scheduleContext = createContext({} as scheduleContext);

export const useScheduleContext = () => {
  return useContext(scheduleContext);
};

export const ScheduleProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<any[]>([]);
  const [cookies] = useCookies();

  const getSchedule = async (seeker_id: string) => {
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/schedules/allSchedules/${cookies.SEEKER_ID}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      await setEvents(res.data.schedules);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const createSchedule = async (data: any) => {
    try {
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_PORT}/schedules/new`,
        data,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const updateSchedule = async (schedule_id: string, newSchedule: Schedule) => {
    try {
      let res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_PORT}/schedules/${schedule_id}`,
        data: newSchedule,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const deleteSchedule = async (schedule_id: string) => {
    try {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_PORT}/schedules/${schedule_id}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      await getSchedule(cookies.SEEKER_ID);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <scheduleContext.Provider
      value={{
        events,
        setEvents,
        getSchedule,
        createSchedule,
        updateSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </scheduleContext.Provider>
  );
};
