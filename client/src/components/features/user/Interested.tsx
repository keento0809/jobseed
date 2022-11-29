import React from 'react';
import CompanyCard from "./CompanyCard";
import {useCompanyContext} from "../../context/companyContext";


const Interested = () => {
    const { companies } = useCompanyContext()
    return (
        <section className="interested card-container">
            {companies!.map( (company) =>
                <CompanyCard
                    key={company.company_id}
                    company_id={company.company_id}
                    name={company.name}
                    location={company.location}
                    link={company.link}
                    jobTitle={company.jobTitle}
                    salary={company.salary}
                    description={company.description}
                    status={company.status}
                    interest={company.interest}
                />)}
        </section>
    );
};

export default Interested;
