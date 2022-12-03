import React, {createContext, ReactNode, useContext, useState} from "react";
import axios from "axios";
import {Company} from "../../types/Company";
import Companies_data from "../../data/Companies_data";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useSeekerContext} from "./seekerContext";

type Props = {
    children: ReactNode
};

/**
 * TODO: separate company data to show and get all companis
 */

type companyContext = {
    companies: Company[],
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;

    getCompanies: (id: string) => void,
    getCompaniesByStatus:(seeker_id: string, status: string) => void,
    createCompany: (data: Company) => void,
    editCompany: (id: string, data: Company) => void,
    deleteCompany: (id: string) => void,
    filteredChildren: string,
    setFilteredChildren: React.Dispatch<React.SetStateAction<string>>;
    showPage: string,
    setShowPage: React.Dispatch<React.SetStateAction<string>>
}

const companyContext = createContext({} as companyContext)

export const useCompanyContext = () => {
    return useContext(companyContext)
}

export const CompanyProvider = ({children}: Props) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const {seeker} = useSeekerContext()
    const [allCompanies, setAllCompanies] = useState<Company[]>([]);
    const [cookies] = useCookies();
    const [filteredChildren, setFilteredChildren] = useState<string>("");
    const [showPage, setShowPage] = useState<string>("Interested");
    const navigate = useNavigate();

    const getCompanies = async (seeker_id: string) => {
        try {
            let res = await axios({
                method: "get",
                url: `http://localhost:8080/companies/${seeker_id}`,
                headers: {
                    authorization:`Bearer ${cookies.JWT_TOKEN}`
                },
                withCredentials : true
            })
            setAllCompanies(res.data);
            console.log(res.data)
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const getCompaniesByStatus = async (seeker_id: string, status: string) => {
        try {
            let res = await axios({
                method: "get",
                url: `http://localhost:8080/companies/${seeker_id}/${status}`,
                headers: {
                    authorization:`Bearer ${cookies.JWT_TOKEN}`
                },
                withCredentials : true
            })
            setCompanies(res.data.companiesWithStatus);
        } catch (err: any) {
            console.log(err)
        }
    }

    const createCompany = async (company: Company) => {
        try {
            let res = await axios({
                method: "post",
                url: "http://localhost:8080/companies/new",
                data: company,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            console.log(res.data)
            navigate("/user", {state: {seeker}});
        } catch (err: any) {
            console.log(err.message);
        }
    }

    const editCompany = async (companyId: string, companyObj: Company) => {
        try {
            let res = await axios({
                method: "patch",
                url: `http://localhost:8080/companies/${companyId}`,
                data: companyObj,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            console.log(res.data)

        } catch (err: any) {
            console.log(err)
        }
    }

    const deleteCompany = async (companyId: string) => {
        try {
            await axios({
                method: "delete",
                url: `http://localhost:8080/companies/${companyId}`,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            console.log("HI")
            navigate("/user", {replace: true});
        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (
        <companyContext.Provider value={
            {companies,
                setCompanies,
                getCompanies,
                getCompaniesByStatus,
                createCompany,
                editCompany,
                deleteCompany,
                filteredChildren,
                setFilteredChildren,
                showPage,
                setShowPage
            }}>
            {children}
        </companyContext.Provider>
    )

}