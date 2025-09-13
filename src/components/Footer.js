// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

// Importez les images des badges pour le footer
import appStoreBadge from "../assets/appstore.webp";
import googlePlayBadge from "../assets/playstore.webp";

function Footer() {
  const appStoreLink =
    "https://apps.apple.com/fr/app/foodtrucks-driver/id6749314863";
  const googlePlayLink =
    "https://play.google.com/store/apps/details?id=com.arkone.foodtruckviewdriver";

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section subscribe-section">
          <h4>Restez Connecté</h4> {/* Nouveau titre pour cette section */}
          <input type="email" placeholder="Votre Email" />
          <button>S'INSCRIRE</button>
          {/* NOUVEAU : Les badges dans le footer */}
          <div className="footer-app-badges">
            <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="footer-badge-img"
              />
            </a>
            <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="footer-badge-img"
              />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Nav</h4>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/inscription">S'inscrire</Link>
            </li>
            <li>
              <Link to="/connexion">Se connecter</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Vendeurs</h4>
          <ul>
            <li>
              <Link to="/vendeurs/inscription">Inscrire mon Food Truck</Link>
            </li>
            <li>
              <a href="#">Suivi GPS</a>
            </li>{" "}
            {/* Garder les liens non créés comme <a> pour l'instant */}
            <li>
              <Link to="/connexion">Connexion Vendeur</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Compagnie</h4>
          <ul>
            <li>
              <Link to="/a-propos">À propos</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2025 Follow My Truck</p>
      </div>
    </footer>
  );
}

export default Footer;
