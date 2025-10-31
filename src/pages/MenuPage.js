// src/pages/MenuPage.js
import React from "react";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async"; // <-- 1. SUPPRIMER CETTE LIGNE
import "./MenuPage.css"; 

function MenuPage() {
  return (
    <div className="menu-page-container">
      {/* --- 2. REMPLACER PAR LA SYNTAXE REACT 19 --- */}
      <title>Mon FoodMood - Connexion ou Inscription</title>
      <meta
        name="description"
        content="Accédez à votre espace FoodMood pour vous connecter, créer un compte ou nous contacter."
      />
      {/* --- FIN DE LA MODIFICATION --- */}

      <h1 className="menu-page-title">Bienvenue sur FoodMood</h1>

      <div className="menu-page-grid">
        {/* Boîte 1 : S'identifier */}
        <div className="menu-card">
          <h2>Déjà un compte ?</h2>
          <p>
            Connectez-vous à votre espace pour gérer votre profil ou retrouver
            vos food trucks favoris.
          </p>
          <Link to="/connexion" className="menu-card-button primary">
            S'identifier
          </Link>
        </div>

        {/* Boîte 2 : S'inscrire */}
        <div className="menu-card">
          <h2>Nouvel utilisateur ?</h2>
          <p>
            Inscrivez-vous pour offrir de la visibilité à votre foodtruck ou
            simplement pour rejoindre notre communauté de gourmands !
          </p>
          <Link to="/inscription" className="menu-card-button primary">
            S'inscrire
          </Link>
        </div>

        {/* Boîte 3 : Contact */}
        <div className="menu-card">
          <h2>Une question ?</h2>
          <p>
            Notre équipe est à votre disposition pour répondre à toutes vos
            questions. N'hésitez pas.
          </p>
          <Link to="/contact" className="menu-card-button secondary">
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;