import React, {useEffect, useState} from 'react';
import Text_filed from "../../../models/Text_filed";
import Button_sm from "../../../models/Button_sm";
import {GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {gapi} from "gapi-script";

type login = {
    login: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

type user = {
    name: string,
    email: string
}

// type IGoogleSuccess = GoogleLoginResponse | GoogleLoginResponseOffline


const Login = ( props : login) => {

    const [loginUser, setLoginUser] = useState<user>({
        name: "",
        email: ""
    })

    // const onSuccess = (res:IGoogleSuccess) => {
    //     console.log("Successfully logged in", res)
    //     console.log(props.login)
    //     props.setLoggedIn(true)
    // }
    //
    // const onFailure = (res: IGoogleSuccess) => {
    //     console.log("Successfully logged in", res)
    // }

    const userHandler = () => {}

    // useEffect(() => {
    //     function start() {
    //         gapi.client.init({
    //             clientId: "128872325253-3t5riu3tn94hr1rv7bam3uuoboemj59e.apps.googleusercontent.com",
    //             scope:""
    //         })
    //     }
    //     gapi.load("client:auth2", start)
    // }, [])

    return (
        <section className="wrapper flex justify-center font-bold">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center">Log in</h2>
                    <form action="src/components/pages/non_user/main/Login" method="post" className="">
                        <Text_filed
                            type={"text"}
                            name={"name"}
                            onChangeHandler={userHandler}
                            value={loginUser.name}
                        />
                        <Text_filed
                            type={"email"}
                            name={"email"}
                            onChangeHandler={userHandler}
                            value={loginUser.email}
                        />
                        < Button_sm
                            title={"log in"}
                            color={"text-white"}
                            bg_color={"bg-content-blue"}
                            className={"mt-8"}
                            width={"w-full"}
                        />
                    </form>
                </div>
            </div>
            <div id="signInButton">
                {/*< GoogleLogin*/}
                {/*    clientId={"128872325253-3t5riu3tn94hr1rv7bam3uuoboemj59e.apps.googleusercontent.com"}*/}
                {/*    buttonText="Login"*/}
                {/*    onSuccess={onSuccess}*/}
                {/*    onFailure={onFailure}*/}
                {/*    cookiePolicy={"single_host_origin"}*/}
                {/*    isSignedIn={true}*/}
                {/*/>*/}
            </div>
        </section>
    );
};

export default Login;
