// src/pages/HomePage.js
import React, { useContext, useMemo } from "react"; // 1. Imports
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 2. Import du contexte
import { jwtDecode } from "jwt-decode"; // 3. Import de jwt-decode
import "./HomePage.css";

import { FaUtensils, FaTruckMoving } from "react-icons/fa";

// Images des villes
import parisImage from "../assets/paris.jpg";
import lyonImage from "../assets/lyon.jpg";
import marseilleImage from "../assets/marseille.jpg";

import finalMockupMap from "../assets/app-map.png";
import professionalMockup from "../assets/acceuil.png";

const cities = [
  {
    name: "PARIS",
    image: parisImage,
    alt: "Food trucks à Paris",
    slug: "paris",
  },
  {
    name: "LYON",
    image: lyonImage,
    alt: "Food trucks à Lyon",
    slug: "lyon",
  },
  {
    name: "MARSEILLE",
    image: marseilleImage,
    alt: "Food trucks à Marseille",
    slug: "marseille",
  },
];

function HomePage() {
  // --- MODIFICATION TÂCHE 3 : Logique de bienvenue ---
  const { authState } = useContext(AuthContext);

  const userData = useMemo(() => {
    try {
      if (authState.token) {
        return jwtDecode(authState.token);
      }
    } catch (error) {
      console.error("Token invalide:", error);
      return null;
    }
  }, [authState.token]);
  // --- FIN MODIFICATION ---

  return (
    <React.Fragment>
      <title>FoodMood - Trouvez les meilleurs Food Trucks (Paris, Lyon...)</title>
      <meta
        name="description"
        content="Découvrez et localisez les meilleurs food trucks près de chez vous. FoodMood vous connecte à la street-food à Paris, Lyon, Marseille et plus."
      />
      <meta name="keywords" content="food truck, street food, paris, lyon, marseille, trouver food truck" />

      <section className="hero-section">
        
        {/* --- MODIFICATION TÂCHE 3 : Affichage du message --- */}
        {userData && (
          <div className="homepage-welcome-banner">
            <p>
              Ravi de vous revoir, <strong>{userData.name}</strong> (@{userData.username}) !
            </p>
          </div>
        )}
        {/* --- FIN MODIFICATION --- */}

        <div className="cities-container">
          {/* Les cartes sont maintenant des liens vers la page d'atterrissage des villes */}
          {cities.map((city) => (
            <Link
              to={`/ville/${city.slug}`} // MISE À JOUR : utilise la route /ville/:slug
              key={city.name}
              className="city-card"
            >
              <img src={city.image} alt={city.alt} />
              <div className="city-name">{city.name}</div>
            </Link>
          ))}
        </div>
        <div className="hero-content">
          <h1>Trouvez les meilleurs food trucks autour de vous</h1>
          <p>
            Découvrez, savourez, et ne manquez plus jamais votre camion préféré.
          </p>
          <div className="hero-cta-buttons">
            <Link to="/food-trucks" className="cta-button primary">
              Trouver un Food Truck
            </Link>
            <Link to="/espace-professionnel" className="cta-button secondary">
              Je suis un Professionnel
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="feature-row">
          <div className="feature-image-wrapper" data-aos="fade-right">
            <img
              src={finalMockupMap}
              alt="Maquette de la carte de l'application"
              className="final-mockup-image"
            />
          </div>
          <div className="feature-text-content" data-aos="fade-up">
            <FaUtensils className="feature-card-icon" />
            <h3>Pour les Gourmands</h3>
            <p>
              Explorez la carte en temps réel, découvrez de nouvelles saveurs
              près de chez vous et consultez les menus. Ne ratez plus jamais le
              passage de votre food truck favori !
            </p>
          </div>
        </div>

        <div className="feature-row reverse">
          <div className="feature-image-wrapper" data-aos="fade-left">
            <img
              src={professionalMockup}
              alt="Maquette de l'application FoodTrucksView Driver"
              className="final-mockup-image"
            />
          </div>
          <div className="feature-text-content" data-aos="fade-up">
            <FaTruckMoving className="feature-card-icon" />
            <h3>Pour les Professionnels</h3>
            <p>
              Gagnez en visibilité, partagez votre position en temps réel et
              mettez à jour vos horaires en quelques clics. Notre application
              Foodmood Driver est conçue pour vous simplifier la vie.
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HomePage;