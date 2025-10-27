// src/components/Header.js
import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";
import logo from "../assets/logo.png";
// 1. IMPORTER LES ICÔNES
import { FaBars, FaTimes } from 'react-icons/fa';

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

      {/* Navigation desktop */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><NavLink to="/">Accueil</NavLink></li>
          <li><NavLink to="/food-trucks">Trouver un Food Truck</NavLink></li>
          <li><NavLink to="/espace-professionnel">Espace Pro</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          {authState.isAuthenticated ? (
            <>
              <li><NavLink to="/mon-compte">Mon Compte</NavLink></li>
              <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/inscription">S'inscrire</NavLink></li>
              <li><NavLink to="/connexion">Se connecter</NavLink></li>
            </>
          )}
        </ul>
      </nav>

      <div className="contact-header-container">
        <Link to="/contact" className="contact-button">
          CONTACT
        </Link>
      </div>

      {/* 2. REMPLACER LE BOUTON HAMBURGER */}
      <button
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Ouvrir le menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* 3. UTILISER "isMenuOpen" POUR METTRE UNE CLASSE "open" */}
      <div 
        className={isMenuOpen ? "backdrop open" : "backdrop"} 
        onClick={closeMenu} 
      />

      <nav 
        id="mobile-nav" 
        className={isMenuOpen ? "mobile-nav open" : "mobile-nav"} 
        role="navigation"
      >
        <ul className="mobile-nav-links">
          <li><NavLink to="/" onClick={closeMenu}>Accueil</NavLink></li>
          <li><NavLink to="/food-trucks" onClick={closeMenu}>Trouver un Food Truck</NavLink></li>
          <li><NavLink to="/espace-professionnel" onClick={closeMenu}>Espace Pro</NavLink></li>
          <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>

          {authState.isAuthenticated ? (
            <>
              <li><NavLink to="/mon-compte" onClick={closeMenu}>Mon Compte</NavLink></li>
              <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/inscription" onClick={closeMenu}>S'inscrire</NavLink></li>
              <li><NavLink to="/connexion" onClick={closeMenu}>Se connecter</NavLink></li>
            </>
          )}

          <li>
            <Link to="/contact" onClick={closeMenu} className="mobile-contact-link">CONTACT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;