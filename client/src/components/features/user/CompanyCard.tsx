import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { BsCalendarPlus } from "react-icons/bs";
import ScheduleModal from "../../../pages/user/ScheduleModal";
import { Company } from "../../../types/Company";
import CompanyEditModal from "../../../pages/user/CompanyEditModal";
import { company_status } from "../../../types/Company";
import { useCompanyContext } from "../../context/companyContext";
import { useCompaniesContext } from "../../context/companiesContext";
import { useAuthContext } from "../../context/AuthContext";
import { COMPANY_ACTIONS } from "../../context/reducer/CompanyReducer";
import axios from "axios";
import { getLat, getLng } from "../../helper/companyHelper";

const CompanyCard = ({
  name,
  jobtype,
  status,
  link,
  company_id,
  description,
  location,
  company_size,
  seeker_id,
  salary,
}: Company) => {
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showStatusDropDown, setShowStatusDropDown] = useState<boolean>(false);
  const { deleteCompany, showPage, editCompany, companies } =
    useCompanyContext();
  const { dispatch } = useCompaniesContext();
  const { seekerState } = useAuthContext();

  const scheduleModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    showScheduleModal
      ? setShowScheduleModal(false)
      : setShowScheduleModal(true);
  };

  const showEditModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    showEditModal ? setShowEditModal(false) : setShowEditModal(true);
  };

  const statusHandler = async (e: React.MouseEvent<HTMLElement>) => {
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
      salary,
    };
    try {
      dispatch({ type: COMPANY_ACTIONS.API_CALL, payload: [] });
      let res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_PORT}/companies/${seekerState.seeker.seeker_id}/${company_id}`,
        data: editStatusCompany,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${seekerState.token}`,
        },
      });
      let getData = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/companies/${seekerState.seeker.seeker_id}`,
        headers: {
          authorization: `Bearer ${seekerState.token}`,
        },
        withCredentials: true,
      });
      const comp: any[] = getData.data.companies;
      comp.forEach((c) => {
        c.location = {
          lat: parseFloat(getLat(c.location)),
          lng: parseFloat(getLng(c.location)),
        };
      });
      res.status === 200 &&
        dispatch({ type: COMPANY_ACTIONS.SUCCESS, payload: comp });
    } catch (err: any) {
      console.log(err);
    }
  };

  const filteredStatus = () => {
    const filteredArr = company_status.filter((status) => status !== showPage);
    return filteredArr;
  };

  const deleteCompanyHandler = async (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: COMPANY_ACTIONS.API_CALL, payload: [] });
      let res = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_PORT}/companies/${seeker_id}/${company_id}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${seekerState.token}`,
        },
      });
      let getData = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/companies/${seekerState.seeker.seeker_id}`,
        headers: {
          authorization: `Bearer ${seekerState.token}`,
        },
        withCredentials: true,
      });
      const comp: any[] = getData.data.companies;
      comp.forEach((c) => {
        c.location = {
          lat: parseFloat(getLat(c.location)),
          lng: parseFloat(getLng(c.location)),
        };
      });
      res.status === 200 &&
        dispatch({ type: COMPANY_ACTIONS.SUCCESS, payload: comp });
    } catch (error: any) {
      console.log(error);
    }
  };

  const statusDropDown = () => (
    <div
      className={`${showStatusDropDown ? "" : "hidden"} left-28 top-0 absolute`}
    >
      <ul className="rounded-lg bg-slate-300">
        {filteredStatus().map((s) => (
          <li
            className="rounded-lg px-4 py-2 hover:bg-slate-200"
            onClick={statusHandler}
            key={s}
          >
            {s}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex rounded-md w-full justify-between border p-6">
      <div className="card-left flex flex-wrap flex-col justify-between">
        <div>
          <h3 className="font-bold">{name}</h3>
          <h2 className="font-thin">{jobtype}</h2>
        </div>
        <div
          className="flex items-center cursor-pointer mt-6 relative"
          onClick={() => setShowStatusDropDown(!showStatusDropDown)}
        >
          <h2 className="bg-slate-300 px-4 rounded-md z-0">{status}</h2>
          {statusDropDown()}
        </div>
      </div>
      <ul className="">
        <li
          onClick={deleteCompanyHandler}
          className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer"
        >
          <BsTrash />
        </li>
        <li className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer">
          <a href={link} target="_blank">
            <AiOutlineLink />
          </a>
        </li>
        <li
          className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer"
          onClick={showEditModalHandler}
        >
          <IoMdCreate />
        </li>
        <li
          className="inline-block p-2 rounded-full hover:bg-slate-300 cursor-pointer"
          onClick={scheduleModalHandler}
        >
          <BsCalendarPlus />
        </li>
      </ul>
      {showScheduleModal && (
        <ScheduleModal
          setShowScheduleModal={setShowScheduleModal}
          seeker_id={seekerState.seeker.seeker_id!}
          company_id={company_id!}
        />
      )}
      {showEditModal && (
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
        />
      )}
    </div>
  );
};

export default CompanyCard;
