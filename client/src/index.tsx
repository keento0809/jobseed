import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { CompanyProvider } from "./components/context/companyContext";
import { ScheduleProvider } from "./components/context/scheduleContext";
import { SeekerProvider } from "./components/context/seekerContext";
import { CompaniesProvider } from "./components/context/companiesContext";
import { AuthProvider } from "./components/context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <AuthProvider>
        <CompaniesProvider>
          <CompanyProvider>
            <ScheduleProvider>
              <SeekerProvider>
                <App />
              </SeekerProvider>
            </ScheduleProvider>
          </CompanyProvider>
        </CompaniesProvider>
      </AuthProvider>
    </CookiesProvider>
  </BrowserRouter>
);
