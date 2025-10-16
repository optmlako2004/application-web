// src/pages/ProfessionalPage.js
import React from "react";
import "./ProfessionalPage.css"; // On importera le style juste après

// Import des captures d'écran de l'application Driver
import driverProfile from "../assets/profil.png";
import driverPosition from "../assets/acceuil.png";
import driverMenu from "../assets/menu.png";
import driverSocial from "../assets/social.png";

// Import des badges des stores
import appStoreBadge from "../assets/appstore.webp";
import googlePlayBadge from "../assets/playstore.webp";

function ProfessionalPage() {
  const appStoreLink =
    "https://apps.apple.com/fr/app/foodtrucks-driver/id6749314863";
  const googlePlayLink =
    "https://play.google.com/store/apps/details?id=com.arkone.foodtruckviewdriver";

  return (
    <div className="pro-page">
      {/* --- Section Héros pour les Pros --- */}
      <section className="pro-hero">
        <div className="pro-hero-content">
          <h1>Donnez à votre Food Truck la Visibilité qu'il Mérite</h1>
          <p className="subtitle">
            Rejoignez notre réseau et connectez-vous à des milliers de clients
            affamés. Simple, rapide et efficace.
          </p>
          <div className="app-badges">
            <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
              <img
                src={appStoreBadge}
                alt="Télécharger sur l'App Store"
                className="badge-img"
              />
            </a>
            <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
              <img
                src={googlePlayBadge}
                alt="Disponible sur Google Play"
                className="badge-img"
              />
            </a>
          </div>
        </div>
      </section>

      {/* --- Section "Comment ça marche" avec les vrais visuels --- */}
      <section className="pro-features">
        <h2>Une Gestion Simplifiée au Bout des Doigts</h2>
        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up">
            <img
              src={driverProfile}
              alt="Gestion du profil Food Truck"
              className="feature-img"
            />
            <h3>1. Créez votre profil</h3>
            <p>
              Ajoutez votre nom, votre plus belle photo et activez votre
              visibilité d'un simple clic avec le bouton "Activer".
            </p>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <img
              src={driverPosition}
              alt="Partage de la position en temps réel"
              className="feature-img"
            />
            <h3>2. Partagez votre position</h3>
            <p>
              Placez-vous sur la carte, définissez vos horaires et informez vos
              clients en temps réel de votre emplacement.
            </p>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <img
              src={driverMenu}
              alt="Ajout du menu du Food Truck"
              className="feature-img"
            />
            <h3>3. Mettez votre menu en valeur</h3>
            <p>
              Faites saliver vos futurs clients en ajoutant jusqu'à 10 photos de
              vos plats directement depuis votre téléphone.
            </p>
          </div>

          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <img
              src={driverSocial}
              alt="Connexion aux réseaux sociaux"
              className="feature-img"
            />
            <h3>4. Connectez votre communauté</h3>
            <p>
              Ajoutez vos liens TikTok, Instagram et Facebook pour que vos
              clients fidèles puissent vous suivre partout.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section des Avantages --- */}
      <section className="pro-benefits">
        <h2>Les Avantages de Foodmoodfrance Driver</h2>
        <ul>
          <li>
            ✅ <strong>Contrôle Total :</strong> Apparaissez ou disparaissez de
            la carte quand vous le voulez.
          </li>
          <li>
            ✅ <strong>Visibilité Maximale :</strong> Soyez découvert par tous
            les utilisateurs de l'application dans votre zone.
          </li>
          <li>
            ✅ <strong>Zéro Effort :</strong> Plus besoin de poster partout où
            vous êtes. Une seule app, tout le monde est prévenu.
          </li>
          <li>
            ✅ <strong>Simple et Intuitif :</strong> Une interface conçue pour
            aller vite, sans fonctionnalités superflues.
          </li>
        </ul>
      </section>

      {/* --- Dernier Appel à l'Action --- */}
      <section className="pro-cta-final">
        <h2>Prêt à faire décoller votre activité ?</h2>
        <div className="app-badges">
          <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
            <img
              src={appStoreBadge}
              alt="Télécharger sur l'App Store"
              className="badge-img"
            />
          </a>
          <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
            <img
              src={googlePlayBadge}
              alt="Disponible sur Google Play"
              className="badge-img"
            />
          </a>
        </div>
      </section>
    </div>
  );
}

export default ProfessionalPage;
