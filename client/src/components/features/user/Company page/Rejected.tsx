import React, {useEffect, useState} from 'react';
import CompanyCard from "../CompanyCard";
import {Company} from "../../../../types/Company";
import EmptyCompany from "../EmptyCompany";
import {useCompaniesContext} from "../../../context/companiesContext";
import {useAuthContext} from "../../../context/AuthContext";

const Rejected = () => {

    const {companyState,filteredChildren} = useCompaniesContext();
    const {companies} = companyState
    const rejectedArr = companies.filter( company => company.status === "Rejected")
    const [filtered, setFiltered] = useState<Company[]>(rejectedArr);
    const {seekerState} = useAuthContext();

    useEffect(() => {
        if (rejectedArr.length > 0 && filteredChildren.length > 0) {
            let filteredArray = rejectedArr.filter(company => company.name?.includes(filteredChildren))
            setFiltered(filteredArray)
            return
        } else if (filteredChildren.length === 0) {
            setFiltered(rejectedArr)
        }
    }, [filteredChildren])

    return (
        <section className={`${rejectedArr.length !== 0 ? "card-container" : null}`}>
            {
                rejectedArr.length !== 0 ? filtered.map((company) =>
                    <CompanyCard
                        key={company.company_id}
                        company_id={company.company_id}
                        name={company.name}
                        location={company.location}
                        link={company.link}
                        jobtype={company.jobtype}
                        salary={company.salary}
                        description={company.description}
                        status={company.status}
                        interest={company.interest}
                        company_size={company.company_size}
                        seeker_id={seekerState.seeker.seeker_id!}
                    />): <EmptyCompany companyStatus={"Rejected"}/>
            }
        </section>
    );
};

export default Rejected;
