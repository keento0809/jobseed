import React, {FC, useState, useEffect} from 'react';
import Text_filed from "../components/models/Text_filed";
import Button_sm from "../components/models/Button_sm";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

/**
 * TODO :
 *  user validation
 */

const Signup: FC = () => {

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const [cookie, setCookie] = useCookies();
    const navigate = useNavigate();

    const userHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const createUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(!newUser.name) {
            console.log("no user")
            return;
        }
        try {
            let res = await axios({
                method: "post",
                url: "http://localhost:8080/auth/signup",
                data: newUser
            })
            setCookie("JWT_TOKEN", res.data.token);
            navigate("/user", { replace: true });

        } catch (e: any) {
            console.log(e)
        }
    }
    return (
        <section className="wrapper flex justify-center">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center font-bold">Welcome to Jub hunter</h2>
                    <form method="post" className="">
                        <Text_filed
                            type={"text"}
                            name={"name"}
                            onChangeHandler={userHandler}
                            value={newUser.name}
                        />
                        <Text_filed
                            type={"email"}
                            name={"email"}
                            onChangeHandler={userHandler}
                            value={newUser.email}
                        />
                        <Text_filed
                            type={"password"}
                            name={"password"}
                            onChangeHandler={userHandler}
                            value={newUser.password}
                        />
                        <Text_filed
                            type={"password"}
                            name={"passwordConfirmation"}
                            onChangeHandler={userHandler}
                            value={newUser.passwordConfirmation}
                        />
                        < Button_sm
                            title={"Sign up"}
                            color={"text-white"}
                            bg_color={"bg-content-blue"}
                            className={"mt-8"}
                            width={"w-full"}
                            onClick={createUser}
                        />
                        <div id="signInDiv"></div>
                    </form>
                </div>
            </div>

        </section>
    );
};

export default Signup;
