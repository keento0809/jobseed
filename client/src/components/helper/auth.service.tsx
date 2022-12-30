import axios from "axios";
import { useCookies } from "react-cookie";
import { Seeker } from "../../types/Seeker";

axios.defaults.baseURL = `${process.env.REACT_APP_PORT}`;

type loginData = {
  email: string;
  password: string;
};

const SignupSeeker = (newUser: Seeker) => {
  const [cookies, setCookie] = useCookies();

  return axios
    .request({
      method: "post",
      url: "/auth/signup",
      data: newUser,
      withCredentials: true,
    })
    .then((result) => {
      if (result.data.token) {
        setCookie("JWT_TOKEN", result.data.token);
      }
      return result.data;
    });
};

const LoginSeeker = (data: loginData) => {
  const [cookies, setCookie] = useCookies();

  return axios
    .request({
      method: "post",
      url: "/auth/login",
      data,
    })
    .then((result) => {
      if (result.data.token) {
        setCookie("JWT_TOKEN", result.data.token);
      }
      return result.data;
    });
};

export default { SignupSeeker, LoginSeeker };
