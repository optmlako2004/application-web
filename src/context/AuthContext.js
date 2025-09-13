// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// 1. Créer le contexte
export const AuthContext = createContext(null);

// 2. Créer le "Fournisseur" de contexte (le composant qui partagera les données)
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  // Ce hook s'exécute une seule fois au chargement de l'app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      // On vérifie si le token n'est pas expiré
      if (decodedToken.exp * 1000 > Date.now()) {
        setAuthState({
          token: token,
          user: decodedToken.user, // Les infos user sont dans le token
          isAuthenticated: true,
        });
      } else {
        localStorage.removeItem("token"); // Le token est expiré, on le supprime
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    setAuthState({
      token: token,
      user: decodedToken.user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
