import React from 'react';
import FullCalendar, {EventClickArg} from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {DateClickArg} from "@fullcalendar/interaction";
import eventList from "../../data/events"

const Calendar = () => {
    const handleClick = (arg: EventClickArg) => {
        console.log(arg)
    }

    return (
        <div className="relative z-5 h-screen">
            <FullCalendar
                locale={"en"}
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                slotDuration="00:30:00"
                weekends={true}
                selectable={true}
                allDayContent={true}
                buttonIcons={false}
                titleFormat={{
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }}
                headerToolbar={{
                    left: "prev,next,today",
                    center: "title",
                    right: 'dayGridMonth,timeGridWeek,listWeek'
                }}
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5],
                    startTime: "0:00",
                    endTime: "24:00",
                }}
                eventTimeFormat={{hour: "numeric", minute: "2-digit"}}
                handleWindowResize={true}
                eventClick={handleClick}
                events={eventList}
            />
            <div>

            </div>
        </div>
    );
};

export default Calendar;