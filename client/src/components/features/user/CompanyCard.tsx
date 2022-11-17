import React, {useState} from 'react';
import {BsTrash} from "react-icons/bs";
import {AiOutlineLink} from "react-icons/ai";
import {IoMdCreate} from "react-icons/io";
import{ BsCalendarPlus} from "react-icons/bs"
import ScheduleModal from "../../../pages/user/ScheduleModal";

type status = "Interested" | "Applied" | "Interview" | "Rejected"

interface Company {
    name: string,
    position: string,
    currentStatus: status,
    link?: string
}

const CompanyCard = ({name, position, currentStatus, link}: Company) => {
    const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false)
    const scheduleModalHandler = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        showScheduleModal === true ? setShowScheduleModal(false) : setShowScheduleModal(true)
    }

    return (
        <div className="flex rounded-md w-full justify-between border p-6">
            <div className="card-left flex flex-wrap flex-col justify-between">
                <div>
                    <h3 className="font-bold">{name}</h3>
                    <h2 className="font-thin">{position}</h2>
                </div>
                <div className="flex items-center cursor-pointer mt-6">
                    <h2 className="bg-slate-300 px-4 rounded-md">{currentStatus}</h2>
                </div>
            </div>
            <ul className="">
                <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer">< BsTrash /></li>
                <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer"><a href={link} >< AiOutlineLink/></a></li>
                <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer">< IoMdCreate /></li>
                <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer" onClick={scheduleModalHandler}>< BsCalendarPlus /></li>
            </ul>
            {showScheduleModal && <ScheduleModal showScheduleModal = {showScheduleModal} setShowScheduleModal={setShowScheduleModal}/>}
        </div>
    );
};

export default CompanyCard;
