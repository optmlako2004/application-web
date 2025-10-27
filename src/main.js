// src/main.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.js";
import { HelmetProvider } from "react-helmet-async"; // 1. Importer

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> {/* 2. Envelopper */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider> {/* 3. Fermer */}
  </React.StrictMode>
);