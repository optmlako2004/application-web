import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";
import "../components/FormStatus.css";
import "../components/FormControls.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// --- 1. Imports pour Google ---
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// ------------------------------

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [status, setStatus] = useState({ message: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- 2. GESTION DES CHAMPS ---
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --- 3. LOGIN CLASSIQUE ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "Connexion...", type: "loading" });

    const { rememberMe, ...submissionData } = formData;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: data.message, type: "success" });
        login(data.token, rememberMe);

        // Redirection après un délai
        setTimeout(() => {
          navigate("/mon-compte");
        }, 1500);
      } else {
        setStatus({ message: `Erreur : ${data.message}`, type: "error" });
        setTimeout(() => setStatus({ message: "", type: "" }), 5000);
      }
    } catch (err) {
      console.error("Erreur lors de la communication avec le serveur", err);
      setStatus({
        message: "Impossible de communiquer avec le serveur.",
        type: "error",
      });
      setTimeout(() => setStatus({ message: "", type: "" }), 5000);
    }
  };

  // --- 4. LOGIN GOOGLE ---
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setStatus({ message: "Vérification Google...", type: "loading" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: credentialResponse.credential }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: data.message, type: "success" });
        login(data.token, false); // Google ne passe pas rememberMe
        setTimeout(() => navigate("/mon-compte"), 1500);
      } else {
        setStatus({ message: `Erreur : ${data.message}`, type: "error" });
        setTimeout(() => setStatus({ message: "", type: "" }), 5000);
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification Google", error);
      setStatus({
        message:
          "Impossible de communiquer avec le serveur pour la connexion Google.",
        type: "error",
      });
      setTimeout(() => setStatus({ message: "", type: "" }), 5000);
    }
  };

  const handleGoogleLoginError = () => {
    console.error("La connexion Google a échoué");
    setStatus({
      message: "La connexion Google a échoué. Veuillez réessayer.",
      type: "error",
    });
    setTimeout(() => setStatus({ message: "", type: "" }), 5000);
  };
  // ------------------------------------

  return (
    <div className="login-container">
      <title>Connexion - FoodMood</title>
      <meta
        name="description"
        content="Connectez-vous à votre compte FoodMood pour accéder à votre espace personnel et gérer vos préférences."
      />

      <div className="login-form-wrapper">
        <h1 className="login-title">Bon retour !</h1>
        <p className="login-subtitle">
          Connectez-vous pour retrouver vos food trucks favoris.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email */}
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

          {/* Mot de passe */}
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
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
                aria-label={
                  showPassword
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Options : Se souvenir de moi */}
          <div className="form-group form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
            {/* <Link to="/oubli-mot-de-passe" className="forgot-password">
              Mot de passe oublié ?
            </Link> */}
          </div>

          {/* Bouton principal */}
          <button type="submit" className="submit-button">
            Se connecter
          </button>

          {/* Message de statut */}
          <p
            className={`form-status ${status.type} ${
              status.message ? "visible" : ""
            }`}
          >
            {status.message}
          </p>
        </form>

        {/* --- Séparateur et connexion Google --- */}
        <div className="divider">
          <span className="divider-text">ou</span>
        </div>

        <div className="google-login-container">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap={false}
            width="300px"
          />
        </div>

        {/* Lien vers inscription */}
        <p className="register-link-prompt">
          Pas encore de compte ? <Link to="/inscription">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
