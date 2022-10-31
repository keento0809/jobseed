import React, {useState} from 'react';
import Description from "./Description";
import hero_top from "../../../images/hero_top.jpg"
import Button_sm from "../../models/Button_sm";

const Hero: React.FunctionComponent<{}> = () => {

    const [language, setLanguage] = useState("English")

    return (
        <main className="wrapper">
            <div className="md:flex justify-center">
                <img src={hero_top} alt="job-search"/>
                <div className="w-full">
                    <h1 className="text-center text-2xl">More efficient</h1>
                    <h1 className="text-center text-2xl">More organized</h1>
                    <p>This is an application blah blah blah blah blah blahblah blah blahblah blah blahblah blah blah</p>
                    < Button_sm
                        title={"sign up"}
                        color={"text-white"}
                        bg_color={"bg-content-blue"}
                        className={"mx-auto my-12 block"}
                        width={"w-1/2"}
                    />
                    <h6>Sign up for free</h6>
                </div>
            </div>

            <div className="">
                <h3></h3>
                <img src="" alt=""/>
            </div>

            <div className="lg:flex">
                < Description title={"title"} detail={"aaaaaaaaa"}/>
                < Description title={"title"} detail={"aaaaaaaaa"}/>
                < Description title={"title"} detail={"aaaaaaaaa"}/>
            </div>

            <select className="select h-8 select-info w-full max-w-xs">
                <option>Select language</option>
                <option>English</option>
                <option>Japanese</option>
                <option>Italian</option>
            </select>
        </main>
    );
};

export default Hero;
