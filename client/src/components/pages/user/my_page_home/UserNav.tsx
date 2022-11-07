import React, {useState} from 'react';
import {Link} from "react-router-dom";
import UserProfile from "./UserProfile";
import human from "../../../../images/human.png";

type nav = {
    showPage: string | null;
    setShowPage: (showPage: string) => void
}

const UserNav = (props: nav) => {

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const item: HTMLButtonElement = e.currentTarget;
        props.setShowPage(item.textContent!)
    }

    const links = [
        {id:1, name: "Interested"},
        {id:2, name: "Applied"},
        {id:3, name: "Interview"},
        {id:4, name: "Rejected"}
    ]
    return (
        <div className="lg:flex">
            < UserProfile
                name={"Misato Tanno"}
                email={"misato@gmail.com"}
                avatar={human}
            />
            <div className="lg:ml-[15%] w-full py-6">
                <div className="user_nav">
                    <ul className="grid grid-cols-4 text-center font-bold">
                        { links.map(link => <button key={link.id} onClick={clickHandler}>{ link.name }</button>) }
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default UserNav;
