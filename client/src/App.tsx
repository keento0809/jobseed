import React, {useEffect, useState, createContext} from 'react';
import Header from "./components/pages/non_user/header/Header";
import {Route, Routes} from "react-router-dom";
import Signup from "./components/pages/non_user/main/Signup";
import Login from "./components/pages/non_user/main/Login";
import Hero from "./components/pages/non_user/main/Hero";
import Footer from "./components/pages/non_user/footer/Footer";
import CompanyMap from "./components/pages/user/my_page_map/Map";
import Calendar from "./components/pages/user/my_page_calender/Calendar";
import TopPage from "./components/pages/user/my_page_home/Top";
import Interested from "./components/pages/user/my_page_home/Interested";
import Applied from "./components/pages/user/my_page_home/Applied";
import Interview from "./components/pages/user/my_page_home/Interview";
import Rejected from "./components/pages/user/my_page_home/Rejected";
import ProtectRoutes from "./components/pages/ProtectRoutes";

function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Hero/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={<ProtectRoutes/>}>
                    <Route path="/user" element={<TopPage/>}>
                        < Route path="interested" element={<Interested/>}/>
                        < Route path="applied" element={<Applied/>}/>
                        < Route path="interview" element={<Interview/>}/>
                        < Route path="Rejected" element={<Rejected/>}/>
                    </Route>
                    <Route path="/calendar" element={<Calendar/>}/>
                    <Route path="/map" element={<CompanyMap/>}/>
                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
