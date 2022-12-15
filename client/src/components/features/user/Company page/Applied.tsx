import React, { useEffect, useState } from "react";
import CompanyCard from "../CompanyCard";
import { Company } from "../../../../types/Company";
import EmptyCompany from "../EmptyCompany";
import { useCompaniesContext } from "../../../context/companiesContext";
import { useAuthContext } from "../../../context/AuthContext";

const Applied = () => {
  const { companyState, filteredChildren } = useCompaniesContext();
  const { companies } = companyState;
  const AppliedArr = companies.filter(
    (company) => company.status === "Applied"
  );
  const [filtered, setFiltered] = useState<Company[]>(AppliedArr);
  const { seekerState } = useAuthContext();

  useEffect(() => {
    if (AppliedArr.length > 0 && filteredChildren.length > 0) {
      let filteredArray = AppliedArr.filter((company) =>
        company.name?.includes(filteredChildren)
      );
      setFiltered(filteredArray);
      return;
    } else if (filteredChildren.length === 0) {
      setFiltered(AppliedArr);
    }
  }, [filteredChildren]);

  return (
    <section className={`${AppliedArr.length !== 0 ? "card-container" : null}`}>
      {AppliedArr.length !== 0 ? (
        filtered.map((company) => (
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
          />
        ))
      ) : (
        <EmptyCompany companyStatus={"Applied"} />
      )}
    </section>
  );
};

export default Applied;
