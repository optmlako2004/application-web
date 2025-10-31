// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- Link a été ajouté
import "./RegisterPage.css";
import "../components/FormStatus.css";
import "../components/FormControls.css"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    privacy: false, // L'état est déjà là, c'est parfait
  });

  const [status, setStatus] = useState({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate(); 

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

    // On n'envoie pas la case "privacy" au backend
    const { privacy, ...submissionData } = formData; 

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: data.message + " Redirection...", type: "success" });
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
          privacy: false,
        });

        // Redirige vers la page de connexion après 2.5 secondes
        setTimeout(() => {
          navigate("/connexion");
        }, 2500);

      } else {
        setStatus({ message: `Erreur : ${data.message}`, type: "error" });

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

      setTimeout(() => {
        setStatus({ message: "", type: "" });
      }, 5000);
    }
  };

  return (
    <div className="register-container">
      <title>Créer un compte - FoodMood</title>
      <meta
        name="description"
        content="Rejoignez la communauté FoodMood et commencez à découvrir les meilleurs food trucks autour de vous."
      />

      <div className="register-form-wrapper">
        <h1 className="register-title">Créer un compte</h1>
        <p className="register-subtitle">
          Rejoignez la communauté et trouvez les meilleurs food trucks !
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* ... (champs username, name, email, password inchangés) ... */}
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
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-icon"
                role="button"
                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* --- MODIFICATION TÂCHE 2 & 3 --- */}
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
              J'ai lu et j'accepte la{" "}
              <Link to="/politique-de-confidentialite" target="_blank">
                politique de confidentialité
              </Link>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="submit-button" 
            disabled={!formData.privacy} // Le bouton est désactivé si privacy est false
          >
            Créer mon compte
          </button>
          {/* --- FIN MODIFICATION --- */}

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