import React, { FC, useEffect, useState } from "react";
import Text_filed from "../components/models/Text_filed";
import Button_sm from "../components/models/Button_sm";
import { useSeekerContext } from "../components/context/seekerContext";
import { Seeker } from "../types/Seeker";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";
import { SEEKER_ACTION } from "../components/context/reducer/SeekerReducer";
import axios from "axios";
import { useCookies } from "react-cookie";

const Signup: FC = () => {
  const [newUser, setNewUser] = useState<Seeker>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const { createSeeker } = useSeekerContext();
  const navigate = useNavigate();
  const { seekerState, seekerDispatch } = useAuthContext();
  const [cookies, setCookie] = useCookies();
  const [allset, setAllset] = useState<boolean>(false);

  const userHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newUser.password !== newUser.passwordConfirmation) {
    }
    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const attention = (
    <div className="mt-8 mx-auto">
      <p className="font-thin text-sm">user name / more than 3 letters</p>
      <p className="font-thin text-sm">user email / please use valid email</p>
      <p className="font-thin text-sm">password / more than 6 letters</p>
    </div>
  );

  const createUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      seekerDispatch({ type: SEEKER_ACTION.SEEKER_FETCHING, payload: {} });
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_PORT}/auth/signup`,
        data: newUser,
        withCredentials: true,
      });
      seekerDispatch({
        type: SEEKER_ACTION.SUCCESS_GET_SEEKER,
        payload: res.data,
      });
      setCookie("JWT_TOKEN", res.data.token);
      setCookie("SEEKER_ID", res.data.seeker.seeker_id);
      navigate("/user", { replace: true });
    } catch (e: any) {
      console.log(e);
    }
    await createSeeker(newUser);
    navigate("/user", { replace: true });
  };

  useEffect(() => {
    if (
      newUser.name.length > 1 &&
      newUser.password!.length > 6 &&
      newUser.password === newUser.passwordConfirmation &&
      newUser.email.includes("@")
    ) {
      setAllset(true);
    } else setAllset(false);
  }, [newUser]);

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

            {allset ? (
              <Button_sm
                title={"Sign up"}
                color={"text-white"}
                bg_color={"bg-content-blue"}
                className={"mt-8"}
                width={"w-full"}
                onClick={createUser}
              />
            ) : (
              attention
            )}
          </form>
          <div id="signInDiv"></div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
