import React, {useState} from 'react';
import {BsTrash} from "react-icons/bs";
import {AiOutlineLink} from "react-icons/ai";
import {IoMdCreate} from "react-icons/io";
import {BsCalendarPlus} from "react-icons/bs"
import ScheduleModal from "../../../pages/user/ScheduleModal";
import {Company} from "../../../types/Company";
import CompanyEditModal from "../../../pages/user/CompanyEditModal";
import {Status} from "../../../types/Company";
import {useSeekerContext} from "../../context/seekerContext";
import {useCompanyContext} from "../../context/companyContext";

const CompanyCard = ({name, jobtype, status, link, company_id, description, location}: Company) => {
    const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showStatusDropDown, setShowStatusDropDown] = useState<boolean>(false)
    const {seeker} = useSeekerContext()
    const {deleteCompany} = useCompanyContext()

    const scheduleModalHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        showScheduleModal ? setShowScheduleModal(false) : setShowScheduleModal(true)
    }

    const showEditModalHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        showEditModal ? setShowEditModal(false) : setShowEditModal(true)
    }

    const getStatus = (status: number) => {
        switch (status) {
            case 0:
                return "Interested"
            case 1:
                return "Applied"
            case 2:
                return "Interview"
            case 3:
                return "Rejected"
        }
    }

    type StatusName = keyof typeof Status
    const enumStatusName = Object.values(Status).filter(item  => typeof item !== "number") as StatusName[];
    const statusArr = enumStatusName.filter(item => item !== getStatus(status!))

    const statusHandler = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e.currentTarget.innerText)
    }

    const statusDropDown = () => <div className={`${showStatusDropDown ? "" : "hidden"} left-28 top-0 absolute`}>
        <ul className="rounded-lg bg-slate-300">
            {statusArr.map( s =>
                <li
                    className="rounded-lg px-4 py-2 hover:bg-slate-200"
                    onClick={statusHandler}
                    key={s}
                >{s}</li>
            )}
        </ul>
    </div>

    return (
        <div className="flex rounded-md w-full justify-between border p-6">
            <div className="card-left flex flex-wrap flex-col justify-between">
                <div>
                    <h3 className="font-bold">{name}</h3>
                    <h2 className="font-thin">{jobtype}</h2>
                </div>
                <div
                    className="flex items-center cursor-pointer mt-6 relative"
                    onClick={()=> setShowStatusDropDown(!showStatusDropDown)}
                >
                    <h2
                        className="bg-slate-300 px-4 rounded-md z-0"
                    >
                        {status}
                    </h2>
                    {statusDropDown()}
                </div>

            </div>
            <ul className="">
                <li
                    onClick={() => {deleteCompany(company_id!)}}
                    className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer">
                    < BsTrash/>
                </li>
                <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer"><a
                    href={link} target="_blank">< AiOutlineLink/></a></li>
                <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer"
                    onClick={showEditModalHandler}>< IoMdCreate/></li>
                <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer"
                    onClick={scheduleModalHandler}>< BsCalendarPlus/></li>
            </ul>
            {showScheduleModal &&
                <ScheduleModal
                    setShowScheduleModal={setShowScheduleModal}
                    seeker_id={seeker!.seeker_id!}
                    company_id={company_id!}
                />}
            {showEditModal &&
                <CompanyEditModal
                    setShowModal={setShowEditModal}
                    name={name}
                    jobtype={jobtype}
                    link={link}
                    description={description}
                    company_id={company_id!}
                    location={location}
                />}
        </div>
    );
};

export default CompanyCard;
