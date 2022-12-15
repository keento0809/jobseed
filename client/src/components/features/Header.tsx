import React, {FC, useState} from 'react';
import {AiOutlineRocket} from "react-icons/ai"
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";
import HamburgerMenu from "./HamburgerMenu";
import logo from "../../images/Screenshot 2022-12-13 at 11.04.29 AM.png";

const Header: FC = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const logout = () => {
        removeCookie("JWT_TOKEN");
        removeCookie("seeker_id");
        navigate("/", {replace: true});
    }

    return (
        <header className="h-24 border-b shadow-md wrapper flex justify-between items-center relative z-[1000]">
            {cookies.JWT_TOKEN ?
                <Link to={"/user"} className="block"><img src={logo} alt="" width={60}/></Link> :
                <Link to={"/"} className="block"><img src={logo} alt="" width={60}/></Link>
            }
            <HamburgerMenu isOpen={openMenu} setMenuOpen={setOpenMenu}/>
            {cookies.JWT_TOKEN ? <section className="flex h-full items-center">
                    <nav
                        className="space-y-1 md:hidden cursor-pointer"
                        onClick={() => setOpenMenu(true)}
                    >
                        <span className="block w-4 h-0.5 bg-gray-600"></span>
                        <span className="block w-4 h-0.5 bg-gray-600"></span>
                        <span className="block w-4 h-0.5 bg-gray-600"></span>
                    </nav>
                    <nav className="hidden md:block h-full ">
                        <ul className="flex h-full">
                            <Link to="/user"
                                  className="block h-full w-32 flex justify-center items-center group relative">
                                <li className="">Home</li>
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full"></span>
                            </Link>
                            <Link to="/calendar"
                                  className="block h-full w-32 flex justify-center items-center group relative">
                                <li className="">Calender</li>
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full">
                            </span>
                            </Link>
                            <Link to="/map"
                                  className="block h-full w-32 flex justify-center items-center group relative">
                                <li className="">Map</li>
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full">
                            </span>
                            </Link>
                            <div
                                onClick={logout}
                                className="cursor-pointer block h-full w-32 flex justify-center items-center group relative">
                                <li className="">Log out</li>
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-2 bg-content-blue transition-all group-hover:w-full">
                            </span>
                            </div>
                        </ul>
                    </nav>
                </section>
                :
                < Link to={"/login"}><h2 className="text-lg duration-200 font-bold hover:bg-content-blue hover:text-white py-1 px-6 rounded-lg">Log in</h2></Link>
            }
        </header>
    );
};

export default Header;
