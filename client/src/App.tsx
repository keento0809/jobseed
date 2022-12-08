import React, {useEffect} from "react";
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
import Documents from "./pages/user/Documents";
import {useCompanyContext} from "./components/context/companyContext";
import {useCookies} from "react-cookie";
import {useSeekerContext} from "./components/context/seekerContext";
import {company_status} from "./types/Company";

function App() {
    const {getSeekerData, setLoadingSeeker, loadingSeeker} = useSeekerContext()
    const {setCompanies, getCompaniesByStatus, companies, getCompanies, allCompanies} = useCompanyContext()
    const [cookie] = useCookies();
    let seeker_id: string;

    if (cookie.JWT_TOKEN && cookie.seeker_id) {
        seeker_id = cookie.seeker_id
    }

    useEffect(() => {
        if (seeker_id !== undefined) {
            getSeekerData(seeker_id)
            getCompanies(seeker_id)
            // getCompaniesByStatus(seeker_id, "Interested")
            setLoadingSeeker(false)
        }
    }, [])


    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Hero/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectRoutes/>}>
                    <Route path="/user" element={<><TopPage/><Outlet/></>}>
                        <Route path="interested" element={<Interested companies={allCompanies}/>}/>
                        <Route path="applied" element={<Applied/>}/>
                        <Route path="interview" element={<Interview/>}/>
                        <Route path="rejected" element={<Rejected/>}/>
                    </Route>
                    <Route path="/calendar" element={<Calendar/>}/>
                    <Route path="/map" element={<CompanyMap/>}/>
                    <Route path="/documents" element={<Documents/>}/>
                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
