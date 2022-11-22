import React from 'react';

type DateTimePickerProps = {
    title: string;
    dateName: string;
    timeName: string;
    dateValue: string;
    timeValue: string;
    timeInclude? : boolean;
    className?: string;
    dateOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    timeOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DateTimePicker = ({ title,dateName,timeName,dateValue, className,timeInclude,dateOnChange, timeOnChange,timeValue}: DateTimePickerProps) => {
    return (
        <label
            className="block mt-6 text-gray-700 text-sm w-full"
        >
            {title}
            <div className="grid font-thin grid-cols-2">
                <input
                    type="date"
                    name={dateName}
                    className={`block py-2 px-3 appearance-none shadow leading-tight focus:outline-none focus:shadow-outline`}
                    id={dateName}
                    value={dateValue}
                    onChange={dateOnChange}
                />
                <input
                    type="time"
                    name={timeName}
                    className={`${timeInclude? null :"hidden"} block py-2 px-3 appearance-none shadow leading-tight focus:outline-none focus:shadow-outline`}
                    id={timeName}
                    value={timeValue}
                    onChange={timeOnChange}
                />
            </div>
        </label>
    );
};

export default DateTimePicker;