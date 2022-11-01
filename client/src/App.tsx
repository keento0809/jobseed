import React, {useEffect, useState} from 'react';
import Header from "./components/non_user/header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./components/non_user/main/Signup"
import Login from "./components/non_user/main/Login";
import Hero from "./components/non_user/main/Hero";
import Footer from "./components/non_user/footer/Footer";

function App() {
    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <div className="App font-Inter">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Hero/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                < Footer/>
            </BrowserRouter>

        </div>
    );
}

export default App;
