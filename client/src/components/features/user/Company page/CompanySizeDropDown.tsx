import React from 'react';

type dropDownProps = {
    onClick: React.MouseEventHandler<HTMLLIElement>
}

const CompanySizeDropDown = ({onClick}: dropDownProps) => {
    const company_size = ["1-10", "11-50", "50-200","201-500", "501-1000", "1001-"]

    return (
        <ul className="absolute w-1/2">
            {company_size.map((size) =>
                <li
                    onClick={onClick}
                    className="block w-full cursor-pointer bg-white hover:bg-blue-300 list-none text-sm shadow-sm appearance-none border rounded w-full py-2 text-gray-700 leading-tight pl-4 focus:outline-none focus:shadow-outline"
                    id={size}
                    key={size}
                >{size}
                </li>
            )}
        </ul>
    );
};

export default CompanySizeDropDown;