import React, {useState} from 'react';
import {Calendar, dateFnsLocalizer, globalizeLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const locales = {
    "en-US": require("date-fns/locale/en-US/index")
}

const DnDCalendar = withDragAndDrop(Calendar);

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
        start: new Date(2022, 11, 17, 12, 0, 0),
        end:new Date(2022, 11, 18, 11, 0, 0)
    }
]



const CalendarPage = () => {

    const [newEvent, setNewEvent] = useState();
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
                endAccessor="end"
                selectable
                style={{height: "500px", margin: "50px", zIndex:"-100"}}
            />
        </div>
    );
};

export default CalendarPage;