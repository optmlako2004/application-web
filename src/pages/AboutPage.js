// src/pages/AboutPage.js
import React from "react";
import "./AboutPage.css";

// Importez les images des badges et du QR code
import qrcodeDriver from "../assets/FoodTrucksDriver.png";
import appStoreBadge from "../assets/appstore.webp";
import googlePlayBadge from "../assets/playstore.webp";

function AboutPage() {
  // Vos liens officiels
  const appStoreLink =
    "https://apps.apple.com/fr/app/foodtrucks-driver/id6749314863";
  const googlePlayLink =
    "https://play.google.com/store/apps/details?id=com.arkone.foodtruckviewdriver";

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>Notre Histoire : La Passion au Service de la Street-Food</h1>
          <p className="subtitle">
            Notre mission est simple : connecter les amateurs de street-food
            avec les chefs talentueux qui animent nos rues.
          </p>
        </div>

        <div className="story-section">
          <h2>L'Histoire d'une Vision et d'une Détermination</h2>
          <p>
            Derrière chaque grande idée se cache une histoire de passion. La
            nôtre est celle de notre fondateur, <strong>M. Mehar Jemai</strong>.
            Animé depuis toujours par l'innovation technologique et un amour
            pour la gastronomie locale, il a fait face à un parcours semé
            d'embûches.
          </p>
          <p>
            Confronté aux défis liés à un handicap, M. Jemai a refusé de voir
            les obstacles comme des barrières. Au contraire, il a puisé dans son
            expérience une force et une perspective uniques, transformant sa
            détermination en un projet ambitieux. Son courage et sa persévérance
            sont la preuve vivante que la volonté peut transcender les
            difficultés pour donner vie à une vision.
          </p>
          <p>
            C'est cette même énergie qui est aujourd'hui au cœur de notre
            entreprise : créer des outils intuitifs qui soutiennent les
            entrepreneurs indépendants et enrichissent la vie de notre
            communauté.
          </p>
        </div>

        <div className="apps-section">
          <h2>Nos Applications : Deux Outils pour une Seule Communauté</h2>
          <div className="apps-grid">
            <div className="app-card">
              <h3>FoodTrucksView</h3>
              <p>
                L'application indispensable pour tous les amateurs de
                street-food. Elle vous permet de géolocaliser en temps réel les
                food trucks autour de vous, de consulter leurs menus, et très
                prochainement, de commander en Click & Collect pour ne plus
                jamais faire la queue.
              </p>
            </div>
            <div className="app-card">
              <h3>FoodTrucksView Driver</h3>
              <p>
                L'outil de gestion conçu pour les propriétaires de food trucks.
                Notre application leur permet de partager leur emplacement
                instantanément, de gagner en visibilité auprès de milliers de
                clients potentiels et de se concentrer sur ce qu'ils font de
                mieux : une cuisine délicieuse.
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
            {/* Badges cliquables */}
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
              {" "}
              {/* Le QR code est pour Android Driver */}
              <img
                src={qrcodeDriver}
                alt="QR Code FoodTrucksView Driver"
                className="qrcode-img"
              />
            </a>
            <p className="qrcode-note">
              (Ce QR code redirige vers l'application FoodTrucksView Driver sur
              Google Play Store et l'App Store)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
