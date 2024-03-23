import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import { UserAuthProvider } from "./context/AuthContext.jsx";
import { CompanyProvider } from "./context/CompanyContext.jsx";

/* 
 ! Notes: 
 ? email verification
 ? password reset

*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserAuthProvider>
        <CompanyProvider>
          <App />
        </CompanyProvider>
      </UserAuthProvider>
    </Router>
  </React.StrictMode>
);
