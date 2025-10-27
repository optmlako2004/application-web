// src/pages/ContactPage.js
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("Envoi en cours...");

    try {
      // On utilise le script PHP local
      const response = await fetch("/send-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus(data.message);
      }
    } catch (error) {
      setFormStatus("Une erreur de communication s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="contact-container">
      <Helmet>
        <title>Nous Contacter - FoodMood</title>
        <meta
          name="description"
          content="Une question ou une suggestion ? Contactez l'équipe de FoodMood via notre formulaire."
        />
      </Helmet>

      <div className="contact-grid">
        <div className="contact-form-wrapper">
          <div className="contact-header">
            <h1>Nous Contacter</h1>
            <p>Une question ou une suggestion ? N'hésitez pas à nous écrire.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Votre Nom</label>
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
              <label htmlFor="email">Votre Email</label>
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
              <label htmlFor="message">Votre Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Envoyer le Message
            </button>
            {formStatus && <p className="form-status">{formStatus}</p>}
          </form>

          {/* VOTRE PHRASE AJOUTÉE ICI */}
          <p className="contact-footer-info">
            N'hésitez pas à consulter notre blog pour les dernières actualités
            ou à nous suivre on nos réseaux sociaux !
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;