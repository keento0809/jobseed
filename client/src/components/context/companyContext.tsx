import {createContext, ReactNode, useContext, useState} from "react";
import axios from "axios";
import {Company} from "../../types/Company";
import Companies_data from "../../data/Companies_data";
import {useCookies} from "react-cookie";

type Props = {
    children: ReactNode
};

/**
 * TODO: separate company data to show and get all companis
 */

type companyContext = {
    companies: Company[],
    getCompanies: (id: string) => void,
    getCompaniesByStatus:(seeker_id: string, status: string) => void,
    createCompany: (data: Company) => void,
    editCompany: (id: string, data: Company) => void,
    deleteCompany: (id: string) => void
}

const companyContext = createContext({} as companyContext)

export const useCompanyContext = () => {
    return useContext(companyContext)
}

export const CompanyProvider = ({children}: Props) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [cookies] = useCookies();

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
            // setCompanies(res.data);
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
            console.log(companies, "I got data")
        } catch (err: any) {
            console.log(err)
        }
    }

    const createCompany = async (company: Company) => {
        try {
            console.log(`Bearer ${cookies.JWT_TOKEN}`)
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
                url: `http://localhost:8080/companies/${companyId}`,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (
        <companyContext.Provider value={{companies, getCompanies, getCompaniesByStatus,createCompany, editCompany, deleteCompany}}>
            {children}
        </companyContext.Provider>
    )

}