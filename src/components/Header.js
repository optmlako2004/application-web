// src/components/Header.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";
import logo from "../assets/ftv-Photoroom.png";

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
          <li>
            <Link to="/food-trucks">Trouver un Food Truck</Link>
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

      {/* ✅ renommage ici */}
      <div className="contact-header-container">
        <Link to="/contact" className="contact-button">
          CONTACT
        </Link>
      </div>

      {/* Menu hamburger */}
      <button
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      {/* Navigation mobile */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          <ul className="mobile-nav-links">
            <li>
              <Link to="/food-trucks" onClick={closeMenu}>
                Trouver un Food Truck
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeMenu}>
                Blog
              </Link>
            </li>
            {authState.isAuthenticated ? (
              <>
                <li>
                  <Link to="/mon-compte" onClick={closeMenu}>
                    Mon Compte
                  </Link>
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
                  <Link to="/inscription" onClick={closeMenu}>
                    S'inscrire
                  </Link>
                </li>
                <li>
                  <Link to="/connexion" onClick={closeMenu}>
                    Se connecter
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="mobile-contact-link"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
