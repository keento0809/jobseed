import {createContext, ReactNode, useContext, useState} from "react";
import axios from "axios";

type Props = {
    children: ReactNode
};

enum Status {
    interested,
    applied,
    interview,
    rejected
}

export type Company = {
    company_id: string;
    name: string;
    size: string;
    link: string;
    location: string;
    jobType: string;
    salary: string;
    description: string;
    status: Status;
    interest: number;
}

type companyContext = {
    companies: Company[] | null,
    getCompanies: (id: string) => void,
    createCompany: (data: Company) => void,
    editCompany: (id: string, data: Company) => void,
    deleteCompany: (id: string) => void
}

const companyContext = createContext({} as companyContext)

export const useCompanyContext = () => {
    return useContext(companyContext)
}

export const CompanyProvider = ({children}: Props) => {
    const [companies, setCompanies] = useState<Company[] | null>([]);

    const getCompanies = async (seeker_id: string) => {
        try {
            let res = await axios({
                method: "get",
                url: `http://localhost:8080/companies/${seeker_id}`
            })
            setCompanies(res.data);
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const createCompany = async (company: Company) => {
        try {
            let res = await axios({
                method: "post",
                url: "http://localhost:8080/companies/new",
                data: company
            })
            setCompanies([...companies!, res.data])
        } catch (err: any) {
            console.log(err.message);
        }
    }

    const editCompany = async (companyId: string, data: Company) => {
        try {
            await axios({
                method: "patch",
                url: `http://localhost:8080/companies/${companyId}`,
                data
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const deleteCompany = async (companyId: string) => {
        try {
            await axios({
                method: "delete",
                url: `http://localhost:8080/companies/${companyId}`
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (
        <companyContext.Provider value={{companies, getCompanies, createCompany, editCompany, deleteCompany}}>
            {children}
        </companyContext.Provider>
    )

}