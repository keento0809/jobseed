import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {TokenProvider} from "./components/context/TokenContext";
import {CookiesProvider} from "react-cookie";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        < BrowserRouter>
            <CookiesProvider>
                <TokenProvider>
                    <App/>
                </TokenProvider>
            </CookiesProvider>
        </BrowserRouter>
    </React.StrictMode>
);

