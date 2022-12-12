import React, {useEffect, useState} from "react";
import Header from "./components/features/Header";
import {Outlet, Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import Footer from "./components/features/Footer";
import Calendar from "./pages/user/Calendar";
import TopPage from "./pages/user/Top";
import Interested from "./components/features/user/Company page/Interested";
import Applied from "./components/features/user/Company page/Applied";
import Interview from "./components/features/user/Company page/Interview";
import Rejected from "./components/features/user/Company page/Rejected";
import CompanyMap from "./pages/user/Map";
import ProtectRoutes from "./components/features/ProtectRoutes";
import Testing from "./components/features/test/Testing";
import {useCompaniesContext} from "./components/context/companiesContext";
import {useFetchCompany} from "./hooks/useFetchCompany";
import {useAuthContext} from "./components/context/AuthContext";
import {useCookies} from "react-cookie";
import {useFetchUser} from "./hooks/useFetchSeeker";
import axios from "axios";
import {SEEKER_ACTION} from "./components/context/reducer/SeekerReducer";

function App() {

    const {companyState} = useCompaniesContext()
    const {companies} = companyState
    const {seekerState, seekerDispatch} = useAuthContext();
    const [cookies] = useCookies();

    // const getSeekerData = async (seeker_id: string) => {
    //     try {
    //         seekerDispatch({type: SEEKER_ACTION.SEEKER_FETCHING, payload:{}})
    //         let res = await axios({
    //             method: "get",
    //             url: `http://localhost:8080/seekers/${seeker_id}`,
    //             withCredentials: true,
    //             headers: {
    //                 authorization: `Bearer ${cookies.JWT_TOKEN}`
    //             }
    //         })
    //         console.log(res.data.seeker)
    //         seekerDispatch({type: SEEKER_ACTION.SUCCESS_GET_SEEKER, payload: res.data})
    //     } catch (error : any) {
    //         seekerDispatch({type: SEEKER_ACTION.FAILED_GET_SEEKER, payload: {}, error})
    //     }
    // }
    //
    // // cookies.JWT_TOKEN ? getSeekerData(cookies.SEEKER_ID) : null
    //
    // console.log(seekerState.seeker.name)

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Hero/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectRoutes/>}>
                    <Route
                        path="/user"
                        element={
                            <>
                                <TopPage/>
                                <Outlet/>
                            </>
                        }
                    >
                        <Route path="interested" element={<Interested/>}/>
                        <Route path="applied" element={<Applied/>}/>
                        <Route path="interview" element={<Interview/>}/>
                        <Route path="rejected" element={<Rejected/>}/>
                    </Route>
                    <Route path="/calendar" element={<Calendar/>}/>
                    <Route path="/map" element={<CompanyMap/>}/>
                    <Route path="/testing" element={<Testing/>}/>
                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
