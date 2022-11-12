import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import {CompanyProvider} from "./components/context/companyContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        < BrowserRouter>
            <CookiesProvider>
                <CompanyProvider>
                    <App/>
                </CompanyProvider>
            </CookiesProvider>
        </BrowserRouter>
    </React.StrictMode>
);

