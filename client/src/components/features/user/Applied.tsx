import React from 'react';
import CompanyCard from "./CompanyCard";
import {useCompanyContext} from "../../context/companyContext";

const Applied = () => {

    const { companies } = useCompanyContext()


    return (
        <section className="interested card-container">

        </section>
    );
};

export default Applied;
