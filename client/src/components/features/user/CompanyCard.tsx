import React, {useState} from 'react';
import {BsTrash} from "react-icons/bs";
import {AiOutlineLink} from "react-icons/ai";
import {IoMdCreate} from "react-icons/io";
import {BsCalendarPlus} from "react-icons/bs"
import ScheduleModal from "../../../pages/user/ScheduleModal";
import {Company} from "../../../types/Company";
import CompanyEditModal from "../../../pages/user/CompanyEditModal";
import {company_status} from "../../../types/Company";
import {useSeekerContext} from "../../context/seekerContext";
import {useCompanyContext} from "../../context/companyContext";


const CompanyCard = ({name, jobtype, status, link, company_id, description, location, company_size, seeker_id, salary}: Company) => {
    const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showStatusDropDown, setShowStatusDropDown] = useState<boolean>(false)
    const {seeker} = useSeekerContext()
    const {deleteCompany, showPage, editCompany} = useCompanyContext()

    console.log(name,jobtype, status, link, company_id, description, location, company_size, seeker_id, salary)

    const scheduleModalHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        showScheduleModal ? setShowScheduleModal(false) : setShowScheduleModal(true)
    }

    const showEditModalHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        showEditModal ? setShowEditModal(false) : setShowEditModal(true)
    }

    const statusHandler = (e: React.MouseEvent<HTMLElement>) => {
        const editStatusCompany: Company = {
            name,
            jobtype,
            status: e.currentTarget.innerText,
            link,
            company_id,
            description,
            location,
            company_size,
            seeker_id,
            salary
        }
        console.log(editStatusCompany)
        editCompany(company_id!, editStatusCompany)
    }

    const filteredStatus = () => {
        const filteredArr = company_status.filter(status => status !== showPage)
        return filteredArr
    }

    const statusDropDown = () => <div className={`${showStatusDropDown ? "" : "hidden"} left-28 top-0 absolute`}>
        <ul className="rounded-lg bg-slate-300">
            {filteredStatus().map( s =>
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
                    status={status!}
                    jobtype={jobtype}
                    link={link}
                    description={description}
                    company_id={company_id!}
                    company_size={company_size}
                    location={location}
                    salary={salary!}
                />}
        </div>
    );
};

export default CompanyCard;
