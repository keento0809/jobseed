import React from 'react';
import CompanyCard from "./CompanyCard";

const Rejected = () => {
    return (
        <section className="rejected card-container">
            < CompanyCard name={"RRRRR"} position={"Developer"} currentStatus={"Applied"} />
            < CompanyCard name={"RRRRR"} position={"Developer"} currentStatus={"Applied"} />
            < CompanyCard name={"RRRRR"} position={"Developer"} currentStatus={"Applied"} />
            < CompanyCard name={"RRRRR"} position={"Developer"} currentStatus={"Applied"} />
            < CompanyCard name={"RRRRR"} position={"Developer"} currentStatus={"Applied"} />
        </section>
    );
};

export default Rejected;
