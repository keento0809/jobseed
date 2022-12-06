import React from 'react';
import {useNavigate} from "react-router-dom";

const ErrorPage = () => {


    const backToHome = () => {

    }

    return (
        <section>
            <h1>The page you were looking for does not exist</h1>
            <button onClick={backToHome}>Go Home</button>
        </section>
    );
};

export default ErrorPage;