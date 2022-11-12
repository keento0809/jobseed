import React, {FC} from 'react';

type CustomTextField = {
    type: string
    name: string;
    value?: string;
    onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Text_filed = (props: CustomTextField) => {

    return (
        <label className="block text-gray-700 mt-6 text-sm font-light mb-2" htmlFor={props.name}>
            {props.name}
            <input
                type={props.type}
                name={props.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={props.name}
                placeholder={props.name}
                onChange={props.onChangeHandler}
                value={props.value}
            />
        </label>
    );
};

export default Text_filed;
