// src/pages/AboutPage.js
import React from "react";
import "./AboutPage.css";
import { Helmet } from "react-helmet-async"; // <-- 1. IMPORTER HELMET

// Importez les images
import qrcodeDriver from "../assets/FoodTrucksDriver.png";
import appStoreBadge from "../assets/appstore.webp";
import googlePlayBadge from "../assets/playstore.webp";
import founderImage from "../assets/Mehar.png";

function AboutPage() {
  const appStoreLink =
    "https://apps.apple.com/fr/app/foodtrucks-driver/id6749314863";
  const googlePlayLink =
    "https://play.google.com/store/apps/details?id=com.arkone.foodtruckviewdriver";

  return (
    <div className="about-page">
      {/* 2. AJOUTER LE BLOC HELMET ICI */}
      <Helmet>
        <title>Notre Histoire - FoodMood</title>
        <meta
          name="description"
          content="Découvrez l'histoire de M. Mehar Jemai, fondateur de FoodMood, et notre mission pour connecter les amateurs de street-food avec les chefs."
        />
      </Helmet>
      {/* FIN DU BLOC HELMET */}

      <div className="about-container">
        <div className="about-header">
          <h1>Notre Histoire : La Passion au Service de la Street-Food</h1>
          <p className="subtitle">
            Notre mission est simple : connecter les amateurs de street-food
            avec les chefs talentueux qui animent nos rues.
          </p>
        </div>

        <div className="story-section">
          <h2>L'Histoire d'une Vision</h2>
          <div className="story-grid">
            <div className="story-text">
              <p>
                Derrière chaque grande idée se cache une histoire de passion. La
                nôtre est celle de notre fondateur,{" "}
                <strong>M. Mehar Jemai</strong>. Animé depuis toujours par
                l'innovation technologique et un amour pour la gastronomie
                locale, il a fait face à un parcours semé d'embûches.
              </p>
              <p>
                Confronté aux défis liés à un handicap, M. Jemai a refusé de
                voir les obstacles comme des barrières. Au contraire, il a puisé
                dans son expérience une force et une perspective uniques,
                transformant sa détermination en un projet ambitieux.
              </p>
              <p>
                C'est cette même énergie qui est aujourd'hui au cœur de notre
                entreprise : créer des outils intuitifs qui soutiennent les
                entrepreneurs indépendants et enrichissent la vie de notre
                communauté.
              </p>
            </div>
            <div className="story-image-wrapper">
              <img
                src={founderImage}
                alt="M. Mehar Jemai, fondateur"
                className="founder-image"
              />
            </div>
          </div>
        </div>

        <div className="apps-section">
          <h2>Nos Deux Applications</h2>
          <div className="apps-grid">
            <div className="app-card">
              <h3>Foodmoodfrance</h3>
              <p>
                Pour les amateurs de street-food. Géolocalisez les food trucks
                en temps réel, consultez leurs menus et, bientôt, commandez en
                Click & Collect.
              </p>
            </div>
            <div className="app-card">
              <h3>Foodmoodfrance Driver</h3>
              <p>
                Pour les propriétaires. Partagez votre emplacement, gagnez en
                visibilité et concentrez-vous sur votre cuisine.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Rejoignez l'Aventure</h2>
          <p>
            Téléchargez l'application qui vous correspond et plongez dans
            l'univers vibrant de la street-food !
          </p>
          <div className="app-badges">
            <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="app-badge-img"
              />
            </a>
            <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="app-badge-img"
              />
            </a>
          </div>
          <div className="qrcode-section">
            <p>Scannez pour télécharger l'application Driver :</p>
            <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
              <img
                src={qrcodeDriver}
                alt="QR Code FoodTrucksView Driver"
                className="qrcode-img"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;