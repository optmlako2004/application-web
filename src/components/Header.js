// src/components/Header.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";
import logo from "../assets/logo.png";

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
          <img src={logo} alt="Follow My Truck Logo" className="logo" />
        </Link>
      </div>

      {/* Navigation desktop */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          {/* ON AJOUTE : Le lien vers la page d'accueil */}
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/food-trucks">Trouver un Food Truck</Link>
          </li>
          <li>
            <Link to="/espace-professionnel">Espace Pro</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          {authState.isAuthenticated ? (
            <>
              <li>
                <Link to="/mon-compte">Mon Compte</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/inscription">S'inscrire</Link>
              </li>
              <li>
                <Link to="/connexion">Se connecter</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="contact-header-container">
        <Link to="/contact" className="contact-button">
          CONTACT
        </Link>
      </div>

      <button
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Ouvrir le menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      {/* Backdrop pour fermer en cliquant à côté */}
      {isMenuOpen && <div className="backdrop" onClick={closeMenu} />}

      {/* Navigation mobile */}
      {isMenuOpen && (
        <nav id="mobile-nav" className="mobile-nav" role="navigation">
          <ul className="mobile-nav-links">
            <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
            <li><Link to="/food-trucks" onClick={closeMenu}>Trouver un Food Truck</Link></li>
            <li><Link to="/espace-professionnel" onClick={closeMenu}>Espace Pro</Link></li>
            <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>

            {authState.isAuthenticated ? (
              <>
                <li><Link to="/mon-compte" onClick={closeMenu}>Mon Compte</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
              </>
            ) : (
              <>
                <li><Link to="/inscription" onClick={closeMenu}>S'inscrire</Link></li>
                <li><Link to="/connexion" onClick={closeMenu}>Se connecter</Link></li>
              </>
            )}

            <li>
              <Link to="/contact" onClick={closeMenu} className="mobile-contact-link">CONTACT</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
