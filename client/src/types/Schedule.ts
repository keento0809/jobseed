import {EventSourceInput} from "@fullcalendar/core";


export type Schedule = {
    schedule_id?: string,
    seeker_id:string;
    company_id:string;
    title: string;
    date: string;
    endDate: string;
    color: string;
    allDay: boolean;
    description?: string;
}

export type CalenderEvent = Schedule & EventSourceInput
