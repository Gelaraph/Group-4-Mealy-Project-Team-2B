import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProtectRoute } from "./component/ProtectRoute";
import AuthProvider from "./providers/AuthProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ProtectRoute>
        <App />
      </ProtectRoute>
    </AuthProvider>
  </BrowserRouter>,
);
