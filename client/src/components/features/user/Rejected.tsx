import React from 'react';
import CompanyCard from "./CompanyCard";
import {Company} from "../../../types/Company";
import EmptyCompany from "./EmptyCompany";

type CompaniesProps = {
    companies : Company[]
}

const Rejected = ({companies} : CompaniesProps) => {
    return (
        <section className="interested card-container">
            <section className="interested card-container">
                {
                    companies.length > 0 ?
                        companies!.map( (company) =>
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
                            />) : < EmptyCompany />
                }
            </section>
        </section>
    );
};

export default Rejected;
