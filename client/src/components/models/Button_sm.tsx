import React, {FC, MouseEventHandler} from 'react';

type Button_sm = {
    title: string;
    color: string;
    bg_color: string;
    onClick?: MouseEventHandler;
    width: string;
    className?:string;
}

const Button_sm = (props: Button_sm) => {
    return (
        <button
            className={`btn ${props.color} ${props.bg_color} ${props.className} ${props.width}`}
            onClick={props.onClick}
        >
            {props.title}
        </button>
    );
};

export default Button_sm;
