// src/components/Header.js
import React, { useState, useContext } from "react";
// ON MODIFIE ICI : On importe NavLink à la place de Link
import { NavLink, Link, useNavigate } from "react-router-dom";
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
        {/* On garde Link pour le logo car il n'a pas besoin de style actif */}
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Follow My Truck Logo" className="logo" />
        </Link>
      </div>

      {/* Navigation desktop */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          {/* ON REMPLACE TOUS LES <Link> PAR <NavLink> ICI */}
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/food-trucks">Trouver un Food Truck</NavLink>
          </li>
          <li>
            <NavLink to="/espace-professionnel">Espace Pro</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          {authState.isAuthenticated ? (
            <>
              <li>
                <NavLink to="/mon-compte">Mon Compte</NavLink>
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
                <NavLink to="/inscription">S'inscrire</NavLink>
              </li>
              <li>
                <NavLink to="/connexion">Se connecter</NavLink>
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

      {/* Navigation mobile (on peut aussi mettre NavLink ici pour plus de cohérence) */}
      {isMenuOpen && (
        <nav id="mobile-nav" className="mobile-nav" role="navigation">
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
      )}
    </header>
  );
}

export default Header;