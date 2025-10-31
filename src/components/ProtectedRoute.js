// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Ce composant est un "wrapper" (enveloppe).
 * Si l'utilisateur est connecté, il affiche le composant enfant (ex: <MyAccountPage />).
 * Si l'utilisateur n'est PAS connecté, il le redirige vers /connexion.
 */
function ProtectedRoute({ children }) {
  const { authState } = useContext(AuthContext);

  if (!authState.isAuthenticated) {
    // L'utilisateur n'est pas connecté.
    // On le redirige vers la page de connexion.
    // 'replace' est important pour que l'utilisateur ne puisse pas "revenir en arrière"
    // et tomber sur une page vide.
    return <Navigate to="/connexion" replace />;
  }

  // L'utilisateur est connecté, on affiche la page demandée.
  return children;
}

export default ProtectedRoute;