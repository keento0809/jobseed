import React, {createContext, ReactNode, useContext, useReducer, useState} from "react";
import {CompanyAction, companyReducer, CompanyState, initialCompanyState} from "./reducer/CompanyReducer";

type Props = {
    children: ReactNode
}

type companiesContext = {
    companyState: CompanyState;
    dispatch: React.Dispatch<CompanyAction>;
    filteredChildren: string,
    setFilteredChildren: React.Dispatch<React.SetStateAction<string>>;
    showPage: string,
    setShowPage: React.Dispatch<React.SetStateAction<string>>
}

const CompaniesContext = createContext({} as companiesContext)

export const useCompaniesContext = () => {
    return useContext(CompaniesContext)
}

export const CompaniesProvider = ({children}: Props) => {
    const [companyState, dispatch] = useReducer(companyReducer, initialCompanyState)
    const [showPage, setShowPage] = useState<string>("Interested");
    const [filteredChildren, setFilteredChildren] = useState<string>("");

    return (
        <CompaniesContext.Provider value={
            {
                filteredChildren,
                setFilteredChildren,
                companyState,
                dispatch,
                showPage,
                setShowPage
            }}>
            {children}
        </CompaniesContext.Provider>
    )
}