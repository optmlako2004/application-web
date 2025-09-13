// src/pages/RegisterPage.js
import React, { useState } from "react";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    privacy: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --- La fonction handleSubmit est maintenant mise à jour ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche la page de se recharger

    // On retire la partie "privacy" avant l'envoi, le backend n'en a pas besoin
    const { privacy, ...submissionData } = formData;

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        // Succès !
        alert(data.message); // Affiche "Utilisateur créé avec succès !"
        // Plus tard, on pourrait rediriger l'utilisateur vers la page de connexion
      } else {
        // Erreur gérée par le backend (ex: email déjà utilisé)
        alert(`Erreur : ${data.message}`);
      }
    } catch (err) {
      // Erreur de réseau (ex: le backend n'est pas lancé)
      console.error("Erreur lors de la communication avec le serveur", err);
      alert(
        "Impossible de communiquer avec le serveur. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h1 className="register-title">Créer un compte</h1>
        <p className="register-subtitle">
          Rejoignez la communauté et trouvez les meilleurs food trucks !
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Le reste du formulaire est inchangé */}
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Votre nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Choisissez un mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group privacy-policy">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              required
            />
            <label htmlFor="privacy">
              J'ai lu et j'accepte la politique de confidentialité
            </label>
          </div>
          <button type="submit" className="submit-button">
            Créer mon compte
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
