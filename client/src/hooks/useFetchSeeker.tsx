import axios, { AxiosRequestConfig } from "axios";
import { useSeekerContext } from "../components/context/seekerContext";
import { useAuthContext } from "../components/context/AuthContext";
import { SEEKER_ACTION } from "../components/context/reducer/SeekerReducer";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

axios.defaults.baseURL = `${process.env.REACT_APP_PORT}`;

export const useFetchUser = (params: AxiosRequestConfig) => {
  const { seekerDispatch } = useAuthContext();
  const [cookies] = useCookies();
  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      seekerDispatch({ type: SEEKER_ACTION.SEEKER_FETCHING, payload: {} });
      const result = await axios.request(params);
      seekerDispatch({
        type: SEEKER_ACTION.SUCCESS_GET_SEEKER,
        payload: result.data,
      });
    } catch (error: any) {
      console.log(error);
      seekerDispatch({ type: SEEKER_ACTION.FAILED_GET_SEEKER, payload: {} });
    }
  };

  useEffect(() => {
    cookies.JWT_TOKEN ? fetchData(params) : null;
  }, []);
};
