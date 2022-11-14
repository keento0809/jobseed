import React from 'react';
import {BsTrash} from "react-icons/bs";
import {AiOutlineLink} from "react-icons/ai";
import {IoMdCreate} from "react-icons/io";
import {BiChevronDown} from "react-icons/bi"

type status = "Interested" | "Applied" | "Interview" | "Rejected"

interface Company {
    name: string,
    position: string,
    currentStatus: status,
    link?: string
}

const CompanyCard = ({name, position, currentStatus, link}: Company) => {
    return (
        <div className="flex rounded-md w-full justify-between  border p-6">
            <div className="card-left flex flex-wrap flex-col justify-between">
                <div>
                    <h3 className="font-bold">{name}</h3>
                    <h2 className="font-thin">{position}</h2>
                </div>
                <div className="flex items-center cursor-pointer">
                    <h2 className="bg-slate-300 px-4 rounded-md">{currentStatus}</h2>
                    <BiChevronDown className="block ml-2"/>
                </div>
            </div>
            <div className="flex flex-wrap flex-col justify-around">
                <div className="p-2 rounded-full hover:bg-slate-300">< BsTrash /></div>
                <div className="p-2 rounded-full hover:bg-slate-300"><a href={link} >< AiOutlineLink/></a></div>
                <div className="p-2 rounded-full hover:bg-slate-300">< IoMdCreate /></div>
                {/*< BsTrash className="block"/>*/}
                {/*<a href={link} className="block">< AiOutlineLink/></a>*/}
                {/*< IoMdCreate className="block"/>*/}

            </div>
        </div>
    );
};

export default CompanyCard;
