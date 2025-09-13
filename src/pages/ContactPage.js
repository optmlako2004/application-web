// src/pages/ContactPage.js
import React, { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Données du formulaire de contact :", formData);
    // Pour l'instant, on affiche une simple alerte.
    // Plus tard, on pourra connecter ceci à un service d'envoi d'emails.
    alert("Merci pour votre message ! Nous vous répondrons dès que possible.");
    // On vide le formulaire
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
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
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
