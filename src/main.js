// src/main.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.js"; // Importer le fournisseur

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* Envelopper App avec AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
