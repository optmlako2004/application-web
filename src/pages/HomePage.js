// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

import { FaUtensils, FaTruckMoving } from "react-icons/fa";

// Images des villes
import parisImage from "../assets/paris.jpg";
import lyonImage from "../assets/lyon.jpg";
import marseilleImage from "../assets/marseille.jpg";

// Mettre à jour les imports des maquettes avec les nouveaux fichiers
import finalMockupMap from "../assets/app-map.png";
import professionalMockup from "../assets/acceuil.png";

const cities = [
  {
    name: "PARIS",
    image: parisImage,
    alt: "Food trucks à Paris",
  },
  {
    name: "LYON",
    image: lyonImage,
    alt: "Food trucks à Lyon",
  },
  {
    name: "MARSEILLE",
    image: marseilleImage,
    alt: "Food trucks à Marseille",
  },
];

function HomePage() {
  return (
    <React.Fragment>
      <section className="hero-section">
        <div className="cities-container">
          {cities.map((city) => (
            <div key={city.name} className="city-card">
              <img src={city.image} alt={city.alt} />
              <div className="city-name">{city.name}</div>
            </div>
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
            {/* ON DÉPLACE L'ICÔNE ICI, en dehors du h3 */}
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
            {/* ON DÉPLACE L'ICÔNE ICI, en dehors du h3 */}
            <FaTruckMoving className="feature-card-icon" />
            <h3>Pour les Professionnels</h3>
            <p>
              Gagnez en visibilité, partagez votre position en temps réel et
              mettez à jour vos horaires en quelques clics. Notre application
              Driver est conçue pour vous simplifier la vie.
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HomePage;
