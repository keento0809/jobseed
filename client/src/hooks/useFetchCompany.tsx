import axios, { AxiosRequestConfig } from "axios";
import {useCompaniesContext} from "../components/context/companiesContext";
import {COMPANY_ACTIONS} from "../components/context/reducer/CompanyReducer";
import {useEffect} from "react";
import {getLat, getLng} from "../components/helper/companyHelper";

axios.defaults.baseURL = "http://localhost:8080";

export const useFetchCompany = (params: AxiosRequestConfig) => {

    const {dispatch, companyState} = useCompaniesContext();
    const {loading} = companyState;

    const fetchData = async (params: AxiosRequestConfig) => {
        try {
            dispatch({type: COMPANY_ACTIONS.API_CALL, payload:[]})
            const result = await axios.request(params)
            const comp : any[] = result.data.companies
            comp.forEach( c => {
                c.location = {lat: parseFloat(getLat(c.location)), lng:  parseFloat(getLng(c.location))}
            })
            dispatch({type: COMPANY_ACTIONS.SUCCESS, payload: comp})
        } catch (error: any) {
            dispatch({type: COMPANY_ACTIONS.ERROR, payload:[], error})
        }
    };

    useEffect(() => {
        fetchData(params)
    }, [])
}