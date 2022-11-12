import React from 'react';

type InputProps = {
    type : string;
    title: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const InputField = ({type, title,name, placeholder, value, onChange} : InputProps) => {
    return (
        <label className="block text-gray-700 mt-6 text-sm font-medium mb-2" htmlFor={name}>
            {title}
            <input
                type={type}
                name={name}
                className="font-thin shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </label>
    );
};

export default InputField;