import React, { useEffect, useState } from "react";
import Text_filed from "../components/models/Text_filed";
import Button_sm from "../components/models/Button_sm";
import { gapi } from "gapi-script";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSeekerContext } from "../components/context/seekerContext";
import { useAuthContext } from "../components/context/AuthContext";
import { SEEKER_ACTION } from "../components/context/reducer/SeekerReducer";
import AuthService from "../components/helper/auth.service";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const { seekerState, seekerDispatch } = useAuthContext();

  const LoginUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      seekerDispatch({ type: SEEKER_ACTION.SEEKER_FETCHING, payload: {} });
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_PORT}/auth/login`,
        data: { email, password },
        withCredentials: true,
      });

      if (res.status === 200) {
        seekerDispatch({
          type: SEEKER_ACTION.SUCCESS_GET_SEEKER,
          payload: res.data,
        });
        setCookie("JWT_TOKEN", res.data.token);
        setCookie("SEEKER_ID", res.data.seeker.seeker_id);
        navigate("/user", { replace: true });
        return;
      }
    } catch (e: any) {
      console.log(e.response.data);
      const alarm = navigate("/login", { replace: true });
      if (e.code === "ERR_BAD_RESPONSE") {
        alert("No user try again");
        setEmail("");
        setPassword("");
      }
    }
  };

  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      plugin_name: "chat",
    });
  });

  const OnSuccess = (res: any) => {
    seekerDispatch({
      type: SEEKER_ACTION.SUCCESS_GET_SEEKER,
      payload: res.profileObj,
    });
    setCookie("JWT_TOKEN", res.accessToken);
    navigate("/user", { replace: true });
  };

  const onFailure = (res: any) => {
    console.log("Fail to login", res);
  };
  return (
    <section className="wrapper flex justify-center font-bold">
      <div className="h-[78vh] flex justify-center items-center">
        <div>
          <h2 className="text-center">Log in</h2>
          <form
            action="src/components/pages/non_user/main/Login"
            method="post"
            className=""
          >
            <Text_filed
              type={"email"}
              name={"email"}
              onChangeHandler={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <Text_filed
              type={"password"}
              name={"password"}
              onChangeHandler={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Button_sm
              title={"log in"}
              color={"text-white"}
              bg_color={"bg-content-blue"}
              className={"mt-8"}
              width={"w-full"}
              onClick={LoginUser}
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
