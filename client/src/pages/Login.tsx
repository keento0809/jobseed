import React, {useEffect, useState} from 'react';
import Text_filed from "../components/models/Text_filed";
import Button_sm from "../components/models/Button_sm";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import {useCookies} from "react-cookie";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {useSeekerContext} from "../components/context/seekerContext";

const Login = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const {setSeeker} = useSeekerContext()

    let axiosConfig = {
        withCredentials : true
    }

    const loginUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            let res = await axios.post(
                "http://localhost:8080/auth/login",
                {email, password},
                axiosConfig
            )
            console.log(res.data.seeker)
            setCookie("JWT_TOKEN", res.data.token);
            setSeeker(res.data.seeker)
            navigate("/user", { replace: true });
        } catch (e: any) {
            console.log(e)
        }
    }

    const OnSuccess = (res: any) => {
        setCookie("JWT_TOKEN", res.accessToken);

        navigate("/user", { replace: true });
    }

    const onFailure = (res: any) => {
        console.log("Fail to login", res)
    }

    // if(cookies.JWT_TOKEN) {
    //     navigate("/user", { replace: true });
    // }

    return (
        <section className="wrapper flex justify-center font-bold">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center">Log in</h2>
                    <form action="src/components/pages/non_user/main/Login" method="post" className="">
                        <Text_filed
                            type={"email"}
                            name={"email"}
                            onChangeHandler={(e)=>{setEmail(e.target.value)}}
                            value={email}
                        />
                        <Text_filed
                            type={"password"}
                            name={"password"}
                            onChangeHandler={(e)=>{setPassword(e.target.value)}}
                            value={password}
                        />
                        < Button_sm
                            title={"log in"}
                            color={"text-white"}
                            bg_color={"bg-content-blue"}
                            className={"mt-8"}
                            width={"w-full"}
                            onClick={loginUser}
                        />
                    </form>
                    <div id="signInButton" className="">
                        {/*< GoogleLogin*/}
                        {/*    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}*/}
                        {/*    buttonText="Login"*/}
                        {/*    onSuccess={OnSuccess}*/}
                        {/*    onFailure={onFailure}*/}
                        {/*    cookiePolicy={"single_host_origin"}*/}
                        {/*    isSignedIn={true}*/}
                        {/*    className="w-full flex justify-center mt-4"*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
