import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";
import "../components/FormStatus.css";
import "../components/FormControls.css"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
// --- 1. Imports pour Google ---
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Vous l'avez déjà, mais c'est utile ici aussi
// -----------------------------

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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --- 2. GESTION DU LOGIN CLASSIQUE ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "Connexion...", type: "loading" });

    const { rememberMe, ...submissionData } = formData;

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: data.message, type: "success" });
        
        // On passe le token ET la case "rememberMe" à la fonction login du contexte
        login(data.token, rememberMe); 
        
        // Redirection après un court délai
        setTimeout(() => {
          navigate("/mon-compte");
        }, 1500);

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

  // --- 3. GESTION DU LOGIN GOOGLE ---
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setStatus({ message: "Vérification Google...", type: "loading" });

    // Le 'credentialResponse.credential' est un JWT de Google.
    // Nous devons l'envoyer à NOTRE backend pour le valider
    // et pour que notre backend crée ou connecte l'utilisateur.
    
    try {
      // ÉTAPE FRONTEND : Envoyer le token Google à notre backend
      const response = await fetch("http://localhost:3001/api/auth/google", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        // Notre backend a validé le token et nous renvoie NOTRE PROPRE token
        setStatus({ message: data.message, type: "success" });
        
        // On connecte l'utilisateur avec notre token (en mode "session" par défaut)
        login(data.token, false); // Google login ne coche pas "rememberMe"
        
        setTimeout(() => {
          navigate("/mon-compte"); // Redirige l'utilisateur
        }, 1500);

      } else {
        // Le backend a renvoyé une erreur
        setStatus({ message: `Erreur : ${data.message}`, type: "error" });
        setTimeout(() => {
          setStatus({ message: "", type: "" });
        }, 5000);
      }

    } catch (error) {
      console.error("Erreur lors de l'authentification Google", error);
      setStatus({
        message: "Impossible de communiquer avec le serveur pour la connexion Google.",
        type: "error",
      });
      setTimeout(() => {
        setStatus({ message: "", type: "" });
      }, 5000);
    }
  };

  const handleGoogleLoginError = () => {
    console.error("La connexion Google a échoué");
    setStatus({
      message: "La connexion Google a échoué. Veuillez réessayer.",
      type: "error",
    });
    setTimeout(() => {
      setStatus({ message: "", type: "" });
    }, 5000);
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
          {/* ... (champs email, password, rememberMe inchangés) ... */}
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
                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

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

          <button type="submit" className="submit-button">
            Se connecter
          </button>

          <p
            className={`form-status ${status.type} ${
              status.message ? "visible" : ""
            }`}
          >
            {status.message}
          </p>
        </form>

        {/* --- 4. AJOUT DU BOUTON GOOGLE ET SÉPARATEUR --- */}
        <div className="divider">
          <span className="divider-text">ou</span>
        </div>

        <div className="google-login-container">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap={false} // On veut que l'utilisateur clique sur le bouton
            width="300px" // S'adapte à la largeur du formulaire
          />
        </div>
        {/* ------------------------------------------- */}


        <p className="register-link-prompt">
          Pas encore de compte ?{" "}
          <Link to="/inscription">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
