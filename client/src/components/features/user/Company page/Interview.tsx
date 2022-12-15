import React, {useEffect, useState} from 'react';
import CompanyCard from "../CompanyCard";
import {Company} from "../../../../types/Company";
import EmptyCompany from "../EmptyCompany";
import {useCompaniesContext} from "../../../context/companiesContext";
import {useAuthContext} from "../../../context/AuthContext";

const Interview = () => {

    const {companyState,filteredChildren} = useCompaniesContext();
    const {companies} = companyState
    const InterviewArr = companies.filter( company => company.status === "Interview")
    const [filtered, setFiltered] = useState<Company[]>(InterviewArr);
    const {seekerState} = useAuthContext();

    useEffect(() => {
        if (InterviewArr.length > 0 && filteredChildren.length > 0) {
            let filteredArray = InterviewArr.filter(company => company.name?.includes(filteredChildren))
            setFiltered(filteredArray)
            return
        }else if (filteredChildren.length === 0) {
            setFiltered(InterviewArr)
        }
    }, [filteredChildren])

    return (
        <section className={`${InterviewArr.length !== 0 ? "card-container" : null}`}>
            {
                InterviewArr.length !== 0 ? filtered.map((company) =>
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
                    />): <EmptyCompany companyStatus={"Interviewed"}/>
            }
        </section>
    );
};

export default Interview;
