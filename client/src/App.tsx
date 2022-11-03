import React, {useEffect, useState, createContext} from 'react';
import Header from "./components/non_user/header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./components/non_user/main/Signup";
import Login from "./components/non_user/main/Login";
import Hero from "./components/non_user/main/Hero";
import Footer from "./components/non_user/footer/Footer";
import UserHome from "./components/user/my_page_home/UserHome";
import Interested from "./components/user/my_page_home/Interested";
import Applied from "./components/user/my_page_home/Applied";
import OnGoing from "./components/user/my_page_home/OnGoing";
import Rejected from "./components/user/my_page_home/Rejected";
import {screen_global_content} from './components/state/screen_context';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App font-Inter">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={loggedIn ? <UserHome/> : <Hero/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/user/interested" element={<Interested/>}/>
                    <Route path="/user/applied" element={<Applied/>}/>
                    <Route path="/user/on_going" element={<OnGoing/>}/>
                    <Route path="/user/rejected" element={<Rejected/>}/>
                </Routes>
                < Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
