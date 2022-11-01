import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="wrapper bg-content-blue text-white py-12">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="text-lg font-bold ">Developers</h2>
                    <a href="#" className="block text-xs">Kento Honda</a>
                    <a href="#" className="block text-xs">Misato Tanno</a>
                </div>
                <div>
                    <h2 className="text-lg font-bold">How to use</h2>
                    < Link to={"/login"}><h2 className="text-lg font-bold">Log in</h2></Link>
                    < Link to={"/signup"}> <h2 className="text-lg font-bold">Sign in</h2></Link>
                </div>

                {/*<div>*/}
                {/*    <h2>How to use</h2>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <h2>Let's discuss with us</h2>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <h2>Visit our websites</h2>*/}
                {/*</div>*/}

            </div>
        </footer>
    );
};

export default Footer;
