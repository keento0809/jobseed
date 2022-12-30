import React, { createContext, ReactNode, useContext, useState } from "react";
import axios from "axios";
import { Company } from "../../types/Company";
import { useCookies } from "react-cookie";
import { useSeekerContext } from "./seekerContext";

type Props = {
  children: ReactNode;
};

type companyContext = {
  companies: Company[];
  allCompanies: Company[];
  companyChange: boolean;
  setCompanyChange: React.Dispatch<React.SetStateAction<boolean>>;
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  locationData: any[];
  setLocationData: React.Dispatch<React.SetStateAction<any[]>>;
  getCompanies: (id: string) => void;
  getCompaniesByStatus: (seeker_id: string, status: string) => void;
  createCompany: (data: Company) => void;
  editCompany: (id: string, seeker_id: string, data: Company) => void;
  deleteCompany: (id: string, seeker_id: string) => void;
  filteredChildren: string;
  setFilteredChildren: React.Dispatch<React.SetStateAction<string>>;
  showPage: string;
  setShowPage: React.Dispatch<React.SetStateAction<string>>;
};

const companyContext = createContext({} as companyContext);

export const useCompanyContext = () => {
  return useContext(companyContext);
};

export const CompanyProvider = ({ children }: Props) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyChange, setCompanyChange] = useState<boolean>(false);
  const { setLoadingSeeker, loadingSeeker } = useSeekerContext();
  const [locationData, setLocationData] = useState<any[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [cookies] = useCookies();
  const [filteredChildren, setFilteredChildren] = useState<string>("");
  const [showPage, setShowPage] = useState<string>("Interested");

  const getLat = (location: string) => {
    let lat = location.split(":")[1];
    let lat2 = lat.split(",")[0];
    return lat2;
  };

  const getLng = (location: string) => {
    let lng = location.split(":")[2];
    let lng2 = lng.split("}")[0];
    return lng2;
  };
  const getCompanies = async (seeker_id: string) => {
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/companies/${seeker_id}`,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
        withCredentials: true,
      });
      const comp: any[] = res.data.companies;
      comp.forEach((c) => {
        locationData.push(c.location);
        c.location = {
          lat: parseFloat(getLat(c.location)),
          lng: parseFloat(getLng(c.location)),
        };
      });
      setAllCompanies(comp);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getCompaniesByStatus = async (seeker_id: string, status: string) => {
    try {
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_PORT}/companies/${seeker_id}/${status}`,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
        withCredentials: true,
      });
      await setCompanies(res.data.companiesWithStatus);
    } catch (err: any) {
      console.log(err);
    }
  };

  const createCompany = async (company: Company) => {
    try {
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_PORT}/companies/new`,
        data: company,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const editCompany = async (
    companyId: string,
    seeker_id: string,
    companyObj: Company
  ) => {
    try {
      let res = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_PORT}/companies/${seeker_id}/${companyId}`,
        data: companyObj,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const deleteCompany = async (companyId: string, seeker_id: string) => {
    try {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_PORT}/companies/${seeker_id}/${companyId}`,
        withCredentials: true,
        headers: {
          authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <companyContext.Provider
      value={{
        companies,
        setCompanies,
        allCompanies,
        locationData,
        companyChange,
        setCompanyChange,
        setLocationData,
        getCompanies,
        getCompaniesByStatus,
        createCompany,
        editCompany,
        deleteCompany,
        filteredChildren,
        setFilteredChildren,
        showPage,
        setShowPage,
      }}
    >
      {children}
    </companyContext.Provider>
  );
};
