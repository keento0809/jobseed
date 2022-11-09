import React from 'react';
import UserHome from "./UserNav";
import CompanyCard from "./CompanyCard";

const Interested = () => {
    return (
        <section className="interested lg:ml-[15%]">
            < CompanyCard name={"CICCC"} position={"Developer"} currentStatus={"Applied"} />
        </section>
    );
};

export default Interested;
