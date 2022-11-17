import React, {ReactNode} from 'react';


type Props = {
    children: ReactNode
};

export type Schedule = {
    title: string;
    allDay: boolean;
    start?: {
        year: number,
        month: number,
        date: number
    },
    end?: {
        year: number,
        month: number,
        date: number
    },

}