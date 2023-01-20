import React, {useState} from 'react';
import Description from "../components/features/Description";
import hero_top from "../images/hero_top.jpg";
import calender from "../images/calender.jpg"
import Button_link from "../components/models/Button_link";
import Loading from "./Loading";

const Hero: React.FunctionComponent = () => {

    return (
        <main className="wrapper">
            <div className="lg:grid lg:grid-cols-2 p-6 items-centers my-28 lg:my-32">
                <img src={hero_top} alt="job-search" className="block max-w-[90%] mx-auto"/>
                <div className="text-center">
                    <h3 className="text-3xl font-bold">Make your job hunting</h3>
                    <h1 className="text-5xl font-extrabold">smooth</h1>
                    <p className="mt-8">This application helps you find your ideal job.</p>
                    <p className="">Without boundary!!</p>
                    <p className="">Let's dive into the new world</p>
                    <div className="mx-auto">
                        < Button_link
                            title={"sign up"}
                            color={"text-white"}
                            bg_color={"bg-content-blue"}
                            className={"py-2 mt-12"}
                            width={"w-1/2"}
                            link={"/signup"}
                        />
                        <p className="top-24 text-xs">Sign up for free</p>
                    </div>
                </div>
            </div>
            <div className="p-6 lg:grid lg:grid-cols-2 items-center my-28 lg:my-32">
                <h3 className="text-center text-3xl font-bold leading-loose">Designed for <span
                    className="text-5xl">anybody</span> who is in the middle of job hunting</h3>
                <img src={calender} alt="job-search" className="block max-w-[75%] mx-auto"/>
            </div>
            <div
                className="mb-8 rounded-lg lg:grid lg:grid-cols-3 bg-content-blue text-white lg:w-screen lg:mx-[calc(50%-50vw)] 2xl:px-40">
                < Description title={"Visualize the data"}
                              detail={"Job seed supports you to organize your schedule and status of the companies you are interested in."}/>
                < Description title={"Sort companies by its status"}
                              detail={"This application allow you to sort out all companies from you are interested in to you already applied or got rejected unfortunately by its status. And easy to maintain by changing status on your user page."}/>
                < Description title={"Make sure company's location before your interview"}
                              detail={"You can utilize this application when you get lost before interview by checking MAP page"}/>
            </div>
        </main>
    );
};

export default Hero;
