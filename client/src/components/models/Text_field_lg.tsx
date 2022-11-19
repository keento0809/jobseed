import React from 'react';

type CustomTextField = {
    name: string;
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextFieldLg = ({name, value, onChange} : CustomTextField) => {

    return (
        <label className="block text-gray-700 mt-2 text-sm font-semibold mb-2" htmlFor={name}>
            {name}
            <textarea
                name={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                placeholder={name}
                onChange={onChange}
                value={value}
            />
        </label>
    );
};

export default TextFieldLg;