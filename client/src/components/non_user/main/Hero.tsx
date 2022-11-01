import React, {useState} from 'react';
import Description from "./Description";
import hero_top from "../../../images/hero_top.jpg";
import calender from "../../../images/calender.jpg"
import Button_sm from "../../models/Button_sm";

const Hero: React.FunctionComponent<{}> = () => {

    const [language, setLanguage] = useState("English")

    return (
        <main className="wrapper">
            <div className="lg:grid lg:grid-cols-2 p-6 items-centers mt-32">
                <img src={hero_top} alt="job-search" className="block max-w-[80%] mx-auto"/>
                <div className="">
                    <h3 className="text-center text-3xl font-bold">Make your job hunting</h3>
                    <h1 className="text-center text-5xl font-extrabold">smooth</h1>
                    <p className="text-center mt-8">This application helps you find your ideal job.</p>
                    <p className="text-center">Without boundary!!</p>
                    <p className="text-center">Let's dive into the new world</p>
                    <div className="relative flex justify-center">
                    < Button_sm
                        title={"sign up"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        className={"mx-auto my-12 block"}
                        width={"w-1/2"}
                    />
                    <p className="absolute top-24 text-xs">Sign up for free</p>
                    </div>
                </div>
            </div>
            <div className="p-6 lg:grid lg:grid-cols-2 items-center">
                <h3 className="text-center text-3xl font-bold leading-loose">Designed for <span className="text-5xl">anybody</span> who is in the middle of job hunting</h3>
                <img src={calender} alt="job-search" className="block max-w-[70%] mx-auto"/>
            </div>
            <div className="rounded-lg lg:grid lg:grid-cols-3 bg-content-blue text-white lg:w-screen lg:mx-[calc(50%-50vw)] 2xl:px-40">
                < Description title={"Track your journy"} detail={"If you find a company that you are interested in, let's add a card to your list"}/>
                < Description title={"Check your availability"} detail={"Use our SIM card with your unlocked Android or iPhone and get free cell phone coverage on one of the nation’s largest wireless networks. Stay connected anywhere in the U.S  without ever paying for a monthly phone bill.  "}/>
                < Description title={"Get out of your location"} detail={"Use our SIM card with your unlocked Android or iPhone and get free cell phone coverage on one of the nation’s largest wireless networks. Stay connected anywhere in the U.S  without ever paying for a monthly phone bill.  "}/>
            </div>

            <div className="flex justify-center my-12 ">
                <select className="select select-info py-3 px-20 max-w-xs border-slate-200">
                    <option>Select language</option>
                    <option>English</option>
                    <option>Japanese</option>
                    <option>Italian</option>
                </select>
            </div>
        </main>
    );
};

export default Hero;
