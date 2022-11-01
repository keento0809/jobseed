import React, {useState} from 'react';
import Text_filed from "../../models/Text_filed";
import Button_sm from "../../models/Button_sm";

const Login = () => {

    type user = {
        name: string,
        email: string
    }

    const [loginUser, setLoginUser] = useState<user>({
        name: "",
        email: ""
    })

    const userHandler = () => {}

    return (
        <section className="wrapper flex justify-center font-bold">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center">Log in</h2>
                    <form action="" method="post" className="">
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
        </section>
    );
};

export default Login;
