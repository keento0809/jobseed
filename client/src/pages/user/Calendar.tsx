import React, {useState} from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";

const locales = {
    "en-US": require("date-fns/locale/en-US/index")
}

const localize = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Big day",
        allDay: true,
        start: new Date(2022,11,1),
        end:new Date(2022,11,3)
    }
]


const CalendarPage = () => {

    const [newEvent, sstNewEvent] = useState();
    const [allEvents, setAllEvents] = useState(events);

    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent!])
    }

    return (
        <div className="">
            <Calendar
                localizer={localize}
                events={allEvents}
                startAccessor="start"
                endAccessor={"end"}
                style={{height: "500px", margin: "50px", zIndex:"-100", position:"relative"}}
            />
        </div>
    );
};

export default CalendarPage;