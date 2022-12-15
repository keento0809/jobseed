import React, { useEffect, useState } from "react";
import CompanyCard from "../CompanyCard";
import { Company } from "../../../../types/Company";
import EmptyCompany from "../EmptyCompany";
import { useAuthContext } from "../../../context/AuthContext";
import { useCompaniesContext } from "../../../context/companiesContext";

const Interested = () => {
  const { companyState, filteredChildren } = useCompaniesContext();
  const { companies } = companyState;
  const InterestedArr = companies.filter(
    (company) => company.status === "Interested"
  );
  const [filtered, setFiltered] = useState<Company[]>(InterestedArr);
  const { seekerState } = useAuthContext();

  useEffect(() => {
    if (InterestedArr.length > 0 && filteredChildren.length > 0) {
      let filteredArray = InterestedArr.filter((company) =>
        company.name.includes(filteredChildren)
      );
      setFiltered(filteredArray);
    } else if (filteredChildren.length === 0) {
      setFiltered(InterestedArr);
    }
  }, [filteredChildren]);

  return (
    <section
      className={`${InterestedArr.length !== 0 ? "card-container" : null}`}
    >
      {InterestedArr.length !== 0 ? (
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
        <EmptyCompany companyStatus={"Interested"} />
      )}
    </section>
  );
};

export default Interested;
