import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Footer = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const logout = () => {
        removeCookie("JWT_TOKEN");
        navigate("/", { replace: true });
    }

    return (
        <footer className="wrapper bg-content-blue text-white py-12">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="text-lg font-bold ">Developers</h2>
                    <a href="src/components/pages/non_user/footer/Footer#" className="block text-xs">Kento Honda</a>
                    <a href="src/components/pages/non_user/footer/Footer#" className="block text-xs">Misato Tanno</a>
                </div>
                <div>
                    <h2 className="text-lg font-bold">How to use</h2>
                    < Link to={"/login"}><h2 className="text-lg font-bold">Log in</h2></Link>
                    < Link to={"/signup"}><h2 className="text-lg font-bold">Sign in</h2></Link>
                    <div onClick={logout}>
                        <h2 className="text-lg font-bold">Log out</h2>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
