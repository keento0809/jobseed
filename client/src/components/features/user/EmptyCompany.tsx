import React from 'react';

type Props = {
    companyStatus: string
}

const EmptyCompany = ({companyStatus}: Props) => {
    return (
        <div className="flex justify-center w-full">
            <h1 className="text-xl font-bold text-slate-500 my-12">
                There is no "{`${companyStatus}`}" companies.
            </h1>
        </div>
    );
};

export default EmptyCompany;