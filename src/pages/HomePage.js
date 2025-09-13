// src/pages/HomePage.js
import React from "react";
import "./HomePage.css";

// Images des villes
import parisImage from "../assets/paris.jpg";
import lyonImage from "../assets/lyon.jpg";
import marseilleImage from "../assets/marseille.jpg";

// Mettre à jour les imports des maquettes avec les nouveaux fichiers
import finalMockupMap from "../assets/app-map.png";
import finalMockupMenu from "../assets/app-menu.png";

// L'import du cadre du smartphone n'est plus nécessaire

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
          <div className="search-bar">
            <input
              type="text"
              placeholder="Entrez une ville, un code postal..."
            />
            <button>CHERCHER</button>
          </div>
        </div>
      </section>

      {/* Section "Comment ça marche ?" avec le code simplifié */}
      <section className="how-it-works-section">
        <div className="feature-row">
          <div className="feature-image-wrapper" data-aos="fade-right">
            {/* STRUCTURE SIMPLIFIÉE : un seul tag <img> suffit maintenant */}
            <img
              src={finalMockupMap}
              alt="Maquette de la carte de l'application"
              className="final-mockup-image"
            />
          </div>
          <div className="feature-text-content" data-aos="fade-up">
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
            {/* STRUCTURE SIMPLIFIÉE : un seul tag <img> suffit maintenant */}
            <img
              src={finalMockupMenu}
              alt="Maquette du menu de l'application"
              className="final-mockup-image"
            />
          </div>
          <div className="feature-text-content" data-aos="fade-up">
            <h3>Pour les Professionnels</h3>
            <p>
              Augmentez votre visibilité, partagez votre position instantanément
              sans effort et fidélisez votre clientèle en l'informant de vos
              déplacements et de vos promotions.
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HomePage;
