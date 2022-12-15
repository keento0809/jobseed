import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {IoCloseOutline} from "react-icons/io5"
import {useCookies} from "react-cookie";

type Props = {
    isOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenu = ({isOpen, setMenuOpen}: Props) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const logout = () => {
        setMenuOpen(false)
        removeCookie("JWT_TOKEN");
        removeCookie("SEEKER_ID");
        navigate("/", { replace: true });
    }

    type link = {
        name: string;
        to: string;
    }

    const links: link[] = [
        {
            name: "Home",
            to: "/user"
        },
        {
            name: "Calendar",
            to: "/calendar"
        },
        {
            name: "Map",
            to: "/map"
        }
    ]

    const nonUserLinks: link[] = [
        {
            name: "Top",
            to: "/"
        },
        {
            name: "Sign up",
            to: "/signup"
        },
        {
            name: "Log in",
            to: "/login"
        }
    ]

    return (
        <div
            className={`transition-all ease-linear top-0 left-0 fixed w-screen h-screen bg-content-blue text-white ${isOpen ? "translate-x-[0vw]" : "translate-x-[100vw]"}`}>
            <div className="flex justify-start py-10 pl-8 ">
                <div
                    className="absolute right-8 cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                >
                    <IoCloseOutline color={"white"} size={30}/>
                </div>
                <ul>
                    {cookies.JWT_TOKEN  ?
                        links.map(link =>
                            <li
                                key={link.name}
                                className="mb-10 font-bold"
                                onClick={() => setMenuOpen(false)}
                            ><Link to={link.to}>{link.name}</Link>
                            </li>
                        ) :
                        nonUserLinks.map( link =>
                            <li
                                key={link.name}
                                className="mb-10 font-bold"
                                onClick={() => setMenuOpen(false)}
                            ><Link to={link.to}>{link.name}</Link>
                            </li>
                        )
                    }
                    { cookies.JWT_TOKEN ?
                        <li
                            className="font-bold my-40 cursor-pointer"
                            onClick={() => logout()}>
                            Log out
                        </li>
                        : null
                    }
                </ul>
            </div>
        </div>
    );
};

export default HamburgerMenu;