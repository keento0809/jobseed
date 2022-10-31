import React, {FC, useState} from 'react';
import Button_sm from "./Button_sm";
import { AiOutlineRocket } from "react-icons/ai"
import {FaBars} from "react-icons/all";

const Header : FC = () => {

    const [login, setLogin] = useState(false)

    const signup = () => {
        console.log("sign in")
    }

    return (
        <header className="flex justify-between items-center py-2 border-b shadow-md wrapper">
            < AiOutlineRocket size="30"/>
            { login ?
                <div className="space-y-1 md:invisible">
                    <span className="block w-4 h-0.5 bg-gray-600"></span>
                    <span className="block w-4 h-0.5 bg-gray-600"></span>
                    <span className="block w-4 h-0.5 bg-gray-600"></span>
                </div> :
                <Button_sm
                    title={"sign up"}
                    color={"text-white"}
                    bg_color={"bg-content-blue"}
                    width={"w-32"}
                    onClick={signup}
                />
            }
        </header>
    );
};

export default Header;
