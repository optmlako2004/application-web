// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./RegisterPage.css";
import "../components/FormStatus.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    privacy: false,
  });

  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "Création du compte...", type: "loading" });

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
        setStatus({ message: data.message, type: "success" });
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
          privacy: false,
        });

        // 1. AJOUTER UN TIMER POUR EFFACER LE MESSAGE
        setTimeout(() => {
          setStatus({ message: "", type: "" });
        }, 5000); // 5 secondes
      } else {
        setStatus({ message: `Erreur : ${data.message}`, type: "error" });

        // 1. AJOUTER UN TIMER POUR EFFACER LE MESSAGE
        setTimeout(() => {
          setStatus({ message: "", type: "" });
        }, 5000);
      }
    } catch (err) {
      console.error("Erreur lors de la communication avec le serveur", err);
      setStatus({
        message: "Impossible de communiquer avec le serveur.",
        type: "error",
      });

      // 1. AJOUTER UN TIMER POUR EFFACER LE MESSAGE
      setTimeout(() => {
        setStatus({ message: "", type: "" });
      }, 5000);
    }
  };

  return (
    <div className="register-container">
      <Helmet>
        <title>Créer un compte - FoodMood</title>
        <meta
          name="description"
          content="Rejoignez la communauté FoodMood et commencez à découvrir les meilleurs food trucks autour de vous."
        />
      </Helmet>

      <div className="register-form-wrapper">
        <h1 className="register-title">Créer un compte</h1>
        <p className="register-subtitle">
          Rejoignez la communauté et trouvez les meilleurs food trucks !
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* ... (le reste de votre formulaire est inchangé) ... */}
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

          <p
            className={`form-status ${status.type} ${
              status.message ? "visible" : ""
            }`}
          >
            {status.message}
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;