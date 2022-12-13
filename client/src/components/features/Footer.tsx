import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import logo from "../../images/Screenshot 2022-12-13 at 11.04.29 AM.png";

const Footer = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const logout = () => {
        removeCookie("JWT_TOKEN");
        removeCookie("access_token");
        removeCookie("seeker_id");
        navigate("/", { replace: true });
    }

    return (
        <footer className="wrapper bg-content-blue text-white py-12">
            <div className="flex justify-between items-center">
                <div className="top">
                    <div className="flex items-center gap-4 mb-3">
                        <img src={logo} alt="" width={60} className="border-4"/>
                        <h2 className="font-bold text-4xl">Job seed</h2>
                    </div>
                    <h2 className="font-bold">Developers</h2>
                    <a href="https://github.com/keento0809" className="block text-xs">Kento Honda</a>
                    <a href="https://github.com/misato0804" className="block text-xs">Misato Tanno</a>
                </div>
                <div className="grid md:grid-cols-4 md:gap-x-10 text-md h-[80%]">
                    {/*<h2 className="text-lg font-thin">How to use</h2>*/}
                    < Link to={"/login"}><h2 className="text-md font-thin">Log in</h2></Link>
                    < Link to={"/signup"}><h2 className="text-md font-thin">Sign up</h2></Link>
                    <div onClick={logout}>
                        <h2 className="text-md font-thin">Log out</h2>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
