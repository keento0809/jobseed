import React, {useEffect, useState} from 'react';
import Header from "./components/models/Header";
import Signup from "./components/non_user/main/Signup"
import Login from "./components/non_user/main/Login";
import Hero from "./components/non_user/main/Hero";
import Footer from "./components/non_user/footer/Footer";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App font-Inter">
            <Header />
            {/*<Signup/>*/}
            {/*< Login />*/}
            {/*< Hero />*/}
            {/*< Footer />*/}
        </div>
    );
}

export default App;
