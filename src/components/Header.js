// src/components/Header.js
import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";
import logo from "../assets/logo.png";
// AJOUT DES NOUVELLES ICÔNES
import { 
  FaBars, 
  FaTimes, 
  FaUserCircle, 
  FaSignOutAlt 
} from 'react-icons/fa';

function Header() {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="logo-container">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="FoodMood Logo" className="logo" />
        </Link>
      </div>

      {/* Navigation desktop (simplifiée, sans les liens de connexion) */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><NavLink to="/">Accueil</NavLink></li>
          <li><NavLink to="/food-trucks">Trouver un Food Truck</NavLink></li>
          <li><NavLink to="/espace-professionnel">Espace Pro</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          {/* Les liens AuthState sont retirés d'ici */}
        </ul>
      </nav>

      {/* MODIFIÉ : Le "contact-header-container" devient le "header-cta" */}
      <div className="header-cta">
        {authState.isAuthenticated ? (
          // Si CONNECTÉ : Mon Compte + Déconnexion
          <>
            <Link to="/mon-compte" className="cta-button">
              <FaUserCircle /> Mon Compte
            </Link>
            <button onClick={handleLogout} className="cta-button-logout">
              <FaSignOutAlt /> Déconnexion
            </button>
          </>
        ) : (
          // Si DÉCONNECTÉ : Mon FoodMood
          <Link to="/menu" className="cta-button">
            <FaUserCircle /> Mon FoodMood
          </Link>
        )}
      </div>

      <button
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Ouvrir le menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div 
        className={isMenuOpen ? "backdrop open" : "backdrop"} 
        onClick={closeMenu} 
      />

      {/* Menu Mobile (réorganisé) */}
      <nav 
        id="mobile-nav" 
        className={isMenuOpen ? "mobile-nav open" : "mobile-nav"} 
      >
        {/* Liens de navigation principaux */}
        <ul className="mobile-nav-links">
          <li><NavLink to="/" onClick={closeMenu}>Accueil</NavLink></li>
          <li><NavLink to="/food-trucks" onClick={closeMenu}>Trouver un Food Truck</NavLink></li>
          <li><NavLink to="/espace-professionnel" onClick={closeMenu}>Espace Pro</NavLink></li>
          <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
        </ul>

        {/* Boutons d'action en bas */}
        <div className="mobile-cta-bottom">
          {authState.isAuthenticated ? (
            <>
              <Link to="/mon-compte" className="cta-button" onClick={closeMenu}>
                <FaUserCircle /> Mon Compte
              </Link>
              <button onClick={handleLogout} className="cta-button-logout">
                <FaSignOutAlt /> Déconnexion
              </button>
            </>
          ) : (
            <Link to="/menu" className="cta-button" onClick={closeMenu}>
              <FaUserCircle /> Mon FoodMood
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;