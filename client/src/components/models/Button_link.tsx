import React, {FC, MouseEventHandler} from 'react';
import {Link} from "react-router-dom";

type Button_link = {
    title: string;
    color: string;
    bg_color: string;
    link: string;
    width: string;
    className?: string;
}

const Button_link = (props: Button_link) => {
    return (
        <Link to={props.link!} className={`block mx-auto rounded  ${props.width} ${props.color} ${props.bg_color} ${props.className} `}>
            <button
                className={`font-bold `}
            >
                {props.title}
            </button>
        </Link>
    );
};

export default Button_link;
