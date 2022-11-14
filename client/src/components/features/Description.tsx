import React, {FC} from 'react';
import {GrAnnounce} from "react-icons/gr";

type description = {
    title: string;
    detail: string
}

const Description = (props: description) => {
    return (
        <div className="py-8 px-8 flex items-start">
            <div>
                <GrAnnounce className="mr-4 -rotate-45 h-full pt-2 icon-fff"/>
            </div>
            <div className="w-4/5">
                <h4 className="text-lg font-bold underline"> {props.title} </h4>
                <p className="mt-6"> {props.detail} </p>
            </div>
        </div>
    );
};

export default Description;
