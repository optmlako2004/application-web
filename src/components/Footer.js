// src/components/Footer.js
import React, { useState } from "react";
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

  // On ajoute un état pour le statut du message ('success' ou 'error')
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(""); // NOUVEL ÉTAT
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageStatus(""); // On réinitialise le statut

    try {
      const response = await fetch("http://localhost:3001/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
      }

      // En cas de succès, on définit le message et le statut
      setMessage("Merci ! Votre inscription a bien été prise en compte.");
      setMessageStatus("success"); // STATUT SUCCÈS
      setEmail("");
    } catch (error) {
      // En cas d'erreur, on définit le message et le statut
      setMessage(error.message);
      setMessageStatus("error"); // STATUT ERREUR
    } finally {
      setIsLoading(false);
    }
  };

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
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Votre Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "ENVOI..." : "NEWSLETTER"}
            </button>
          </form>

          {/* On applique dynamiquement la classe CSS en fonction du statut */}
          {message && (
            <p className={`subscribe-message ${messageStatus}`}>{message}</p>
          )}

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
