import React, {FC, useState} from 'react';
import Button_sm from "../models/Button_sm";
import {AiOutlineRocket} from "react-icons/ai"
import {Link, Navigate} from 'react-router-dom';
import {useTokenContext} from "../context/TokenContext";
import {useCookies} from "react-cookie";
import HamburgerMenu from "./HamburgerMenu";

const Header: FC = () => {
    const [cookie] = useCookies();
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    return (
        <header className="h-24 border-b shadow-md wrapper flex justify-between items-center">
            {cookie.JWT_TOKEN ?
                <Link to={"/user"} className="block">< AiOutlineRocket size="30"/></Link> :
                <Link to={"/"} className="block">< AiOutlineRocket size="30"/></Link>
            }

            <HamburgerMenu isOpen={openMenu} setMenuOpen={setOpenMenu}/>
            <section className="flex h-full items-center">
                <nav
                    className="space-y-1 md:hidden cursor-pointer"
                    onClick={() => setOpenMenu(true)}
                >
                    <span className="block w-4 h-0.5 bg-gray-600"></span>
                    <span className="block w-4 h-0.5 bg-gray-600"></span>
                    <span className="block w-4 h-0.5 bg-gray-600"></span>
                </nav>
                <nav className="hidden md:block h-full">
                    <ul className="flex h-full">
                        <Link to="/user"
                              className="block h-full w-32 flex justify-center items-center group relative">
                            <li className="">Home</li>
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                        <Link to="/calendar"
                              className="block h-full w-32 flex justify-center items-center group relative">
                            <li className="">Calender</li>
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                        <Link to="/calendar"
                              className="block h-full w-32 flex justify-center items-center group relative">
                            <li className="">Your journey</li>
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                        <Link to="/map"
                              className="block h-full w-32 flex justify-center items-center group relative">
                            <li className="">Map</li>
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                        <Link to="/map"
                              className="block h-full w-32 flex justify-center items-center group relative">
                            <li className="">Documentations</li>
                            <span
                                className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                    </ul>
                </nav>
            </section>
        </header>
    );
};

export default Header;
