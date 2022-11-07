import React, {FC, useState} from 'react';
import Button_sm from "../../../models/Button_sm";
import {AiOutlineRocket} from "react-icons/ai"
import {FaBars} from "react-icons/all";
import {Link} from 'react-router-dom';

const Header: FC = () => {

    const [login, setLogin] = useState(false)

    const signup = () => {
        console.log("sign in")
    }

    return (
        <header className="h-24 border-b shadow-md wrapper flex justify-between items-center">
            <Link to={"/"} className="block">< AiOutlineRocket size="30"/></Link>
            {login ?
                <section className="flex h-full items-center">
                    <div className="space-y-1 md:hidden ">
                        <span className="block w-4 h-0.5 bg-gray-600"></span>
                        <span className="block w-4 h-0.5 bg-gray-600"></span>
                        <span className="block w-4 h-0.5 bg-gray-600"></span>
                    </div>
                    {/*flex justify-between h-full hidden md:block*/}
                    <nav className="hidden md:block h-full">
                        <ul className="flex h-full">
                            <Link to="/" className="block h-full w-32 flex justify-center items-center group relative"><li className="">Home</li><span className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                            <Link to="/calendar" className="block h-full w-32 flex justify-center items-center group relative"><li className="">Calender</li><span className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                            <Link to="/calendar" className="block h-full w-32 flex justify-center items-center group relative"><li className="">Your journey</li><span className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                            <Link to="/map" className="block h-full w-32 flex justify-center items-center group relative"><li className="">Map</li><span className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                            <Link to="/map" className="block h-full w-32 flex justify-center items-center group relative"><li className="">Documentations</li><span className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span></Link>
                        </ul>
                    </nav>


                </section>
                :
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
