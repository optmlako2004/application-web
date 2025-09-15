// src/pages/ContactPage.js
import React, { useState } from "react";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ON MODIFIE : L'état pour gérer le statut de l'envoi
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // ON MODIFIE : La fonction handleSubmit pour utiliser Formspree
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("Envoi en cours...");

    try {
      const response = await fetch("https://formspree.io/f/mrbavqrk", {
        // <-- REMPLACE AVEC TON VRAI LIEN
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Merci ! Votre message a bien été envoyé.");
        setFormData({ name: "", email: "", message: "" }); // On vide le formulaire
      } else {
        setFormStatus("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      setFormStatus("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="contact-container">
      {/* ON AJOUTE : La structure de la grille */}
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
            {/* ON AJOUTE : Un message pour informer l'utilisateur du statut de l'envoi */}
            {formStatus && <p className="form-status">{formStatus}</p>}
          </form>
        </div>

        {/* ON AJOUTE : La nouvelle colonne d'informations */}
        <div className="contact-info">
          <h3>Informations</h3>
          <p>
            Pour toute demande, vous pouvez également nous joindre directement :
          </p>
          <p>
            <strong>Email :</strong> foodtrucksview@gmail.com
          </p>
          <p>
            <strong>Téléphone :</strong> +33 6 51 63 51 01
          </p>
          <p>
            N'hésitez pas à consulter notre blog pour les dernières actualités
            ou à nous suivre sur nos réseaux sociaux !
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
