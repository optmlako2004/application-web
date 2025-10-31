// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// 1. Créer le contexte
export const AuthContext = createContext(null);

// 2. Créer le "Fournisseur" de contexte
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null, // L'objet utilisateur (id, name, email, etc.)
    isAuthenticated: false,
  });

  // Ce hook s'exécute une seule fois au chargement de l'app
  useEffect(() => {
    // --- MODIFICATION ---
    // 1. Chercher dans localStorage (Se souvenir de moi)
    let token = localStorage.getItem("token");
    
    // 2. Sinon, chercher dans sessionStorage (Session simple)
    if (!token) {
      token = sessionStorage.getItem("token");
    }
    // --- FIN MODIFICATION ---

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuthState({
            token: token,
            // --- CORRECTION ---
            // Le token décodé EST l'objet utilisateur
            user: decodedToken, 
            isAuthenticated: true,
          });
        } else {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Erreur de décodage du token:", error);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
  }, []);

  // --- MODIFICATION ---
  // On accepte un 2ème argument : rememberMe (un booléen)
  const login = (token, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    // --- FIN MODIFICATION ---

    try {
      const decodedToken = jwtDecode(token);
      setAuthState({
        token: token,
        // --- CORRECTION ---
        user: decodedToken, // Le token décodé EST l'objet utilisateur
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Erreur de décodage du token au login:", error);
    }
  };

  const logout = () => {
    // --- MODIFICATION ---
    // On vide les DEUX stockages
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // --- FIN MODIFICATION ---
    
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