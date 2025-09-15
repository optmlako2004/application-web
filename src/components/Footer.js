// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import appStoreBadge from "../assets/appstore.webp";
import googlePlayBadge from "../assets/playstore.webp";

// Logos réseaux sociaux
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import tiktokLogo from "../assets/tiktok.png";

// Icônes pour les liens du menu
import {
  FaHome,
  FaTruck,
  FaBlog,
  FaPhoneAlt,
  FaUserTie,
  FaSignInAlt,
  FaInfoCircle,
} from "react-icons/fa";

function Footer() {
  const appStoreLink =
    "https://apps.apple.com/fr/app/foodtrucks-driver/id6749314863";
  const googlePlayLink =
    "https://play.google.com/store/apps/details?id=com.arkone.foodtruckviewdriver";

  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-section footer-brand">
          <h4>FoodTrucksView</h4>
          <p>
            La plateforme qui connecte les passionnés de street-food avec les
            meilleurs food trucks.
          </p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src={facebookLogo} alt="Facebook" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src={instagramLogo} alt="Instagram" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <img src={tiktokLogo} alt="TikTok" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li>
              <Link to="/">
                <FaHome className="footer-icon" /> Accueil
              </Link>
            </li>
            <li>
              <Link to="/food-trucks">
                <FaTruck className="footer-icon" /> Trouver un Food Truck
              </Link>
            </li>
            <li>
              <Link to="/blog">
                <FaBlog className="footer-icon" /> Blog
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FaPhoneAlt className="footer-icon" /> Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Professionnels */}
        <div className="footer-section">
          <h4>Professionnels</h4>
          <ul>
            <li>
              <Link to="/espace-professionnel">
                <FaUserTie className="footer-icon" /> Inscrire mon Food Truck
              </Link>
            </li>
            <li>
              <Link to="/connexion">
                <FaSignInAlt className="footer-icon" /> Connexion Vendeur
              </Link>
            </li>
            <li>
              <Link to="/a-propos">
                <FaInfoCircle className="footer-icon" /> À propos
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section subscribe-section">
          <h4>Rejoignez-nous</h4>
          <p>Recevez nos nouveautés et promotions directement par email.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Votre Email" />
            <button>S'INSCRIRE</button>
          </div>
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
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 FoodTrucksView</p>
      </div>
    </footer>
  );
}

export default Footer;
