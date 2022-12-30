import axios, { AxiosRequestConfig } from "axios";
import { useCompaniesContext } from "../components/context/companiesContext";
import { COMPANY_ACTIONS } from "../components/context/reducer/CompanyReducer";
import { useEffect } from "react";
import { getLat, getLng } from "../components/helper/companyHelper";
import { useCookies } from "react-cookie";

axios.defaults.baseURL = "https://jobseed.herokuapp.com";

export const useFetchCompany = (params: AxiosRequestConfig) => {
  const [cookies] = useCookies();
  const { dispatch } = useCompaniesContext();
  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      dispatch({ type: COMPANY_ACTIONS.API_CALL, payload: [] });
      const result = await axios.request(params);
      const comp: any[] = result.data.companies;
      comp.forEach((c) => {
        c.location = {
          lat: parseFloat(getLat(c.location)),
          lng: parseFloat(getLng(c.location)),
        };
      });
      dispatch({ type: COMPANY_ACTIONS.SUCCESS, payload: comp });
    } catch (error: any) {
      dispatch({ type: COMPANY_ACTIONS.ERROR, payload: [], error });
    }
  };

  useEffect(() => {
    fetchData(params);
  }, []);
};
