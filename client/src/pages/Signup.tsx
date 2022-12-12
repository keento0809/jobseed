import React, {FC, useState} from "react";
import Text_filed from "../components/models/Text_filed";
import Button_sm from "../components/models/Button_sm";
import {useSeekerContext} from "../components/context/seekerContext";
import {Seeker} from "../types/Seeker";

const Signup: FC = () => {
    const [newUser, setNewUser] = useState<Seeker>({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });
    const {createSeeker} = useSeekerContext();

    const userHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser!, [e.target.name]: e.target.value});
    };
    const createUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(newUser)
        createSeeker(newUser);
    };
    return (
        <section className="wrapper flex justify-center">
            <div className="h-[78vh] flex justify-center items-center">
                <div>
                    <h2 className="text-center font-bold">Welcome to Jub hunter</h2>
                    <form action="">

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
                        <Button_sm
                            title={"Sign up"}
                            color={"text-white"}
                            bg_color={"bg-content-blue"}
                            className={"mt-8"}
                            width={"w-full"}
                            onClick={createUser}
                        />
                    </form>
                    <div id="signInDiv"></div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
