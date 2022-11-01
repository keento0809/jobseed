import React, {FC, useState} from 'react';
import Text_filed from "../../models/Text_filed";
import Button_sm from "../../models/Button_sm";

const Signup: FC = () => {

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const userHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    return (
        <section className="wrapper flex justify-center">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center">Sign up</h2>
                    <form action="" method="post" className="">
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
                            name={"confirmPassword"}
                            onChangeHandler={userHandler}
                            value={newUser.confirmPassword}
                        />
                        < Button_sm
                            title={"create"}
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

export default Signup;
