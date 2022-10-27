import React, {useState} from 'react';
import Hero from "./components/main/Hero";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App">
            { loggedIn?  <h1>Hello</h1> : <Hero/>}
        </div>
    );
}

export default App;
