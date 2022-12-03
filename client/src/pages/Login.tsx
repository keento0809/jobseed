import React, {useState} from 'react';
import Text_filed from "../components/models/Text_filed";
import Button_sm from "../components/models/Button_sm";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useSeekerContext} from "../components/context/seekerContext";

const Login = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const {setSeeker, loginSeeker} = useSeekerContext()

    const loginUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        loginSeeker(email, password)
    }

    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            plugin_name: "chat",
        });
    });

    const OnSuccess = (res: any) => {
        console.log(res.profileObj.imageUrl)
        setSeeker({
            seeker_id: res.profileObj.googleId,
            name: res.profileObj.name,
            email: res.profileObj.email,
            avatar: res.profileObj.imageUrl
        })
        setCookie("JWT_TOKEN", res.accessToken);
        navigate("/user", {replace: true});
    }

    const onFailure = (res: any) => {
        console.log("Fail to login", res)
    }
    return (
        <section className="wrapper flex justify-center font-bold">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center">Log in</h2>
                    <form action="src/components/pages/non_user/main/Login" method="post" className="">
                        <Text_filed
                            type={"email"}
                            name={"email"}
                            onChangeHandler={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                        />
                        <Text_filed
                            type={"password"}
                            name={"password"}
                            onChangeHandler={(e) => {
                                setPassword(e.target.value)
                            }}
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
