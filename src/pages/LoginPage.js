// src/pages/LoginPage.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";
import "../components/FormStatus.css"; 

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [status, setStatus] = useState({ message: "", type: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "Connexion en cours...", type: "loading" });

    const submissionData = {
      email: loginData.email,
      password: loginData.password,
    };

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
        setStatus({
          message: "Connexion réussie ! Redirection...",
          type: "success",
        });
        login(data.token);
        // Le message disparaît grâce à la redirection
        setTimeout(() => navigate("/"), 1000);
      } else {
        setStatus({ message: `Erreur : ${data.message}`, type: "error" });

        // 1. AJOUTER UN TIMER POUR EFFACER LE MESSAGE D'ERREUR
        setTimeout(() => {
          setStatus({ message: "", type: "" });
        }, 5000); // 5 secondes
      }
    } catch (err) {
      console.error("Erreur lors de la communication avec le serveur", err);
      setStatus({
        message: "Impossible de communiquer avec le serveur.",
        type: "error",
      });

      // 1. AJOUTER UN TIMER POUR EFFACER LE MESSAGE D'ERREUR
      setTimeout(() => {
        setStatus({ message: "", type: "" });
      }, 5000);
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Connexion - FoodMood</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte FoodMood pour retrouver vos food trucks favoris et gérer votre profil."
        />
      </Helmet>

      <div className="login-form-wrapper">
        <h1 className="login-title">Connexion</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* ... (le reste de votre formulaire est inchangé) ... */}
          <div className="form-group">
            <label htmlFor="email">Email ou Nom d'utilisateur</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={loginData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Se souvenir de moi</label>
          </div>

          <button type="submit" className="submit-button">
            SE CONNECTER
          </button>

          <p
            className={`form-status ${status.type} ${
              status.message ? "visible" : ""
            }`}
          >
            {status.message}
          </p>

          <div className="form-links">
            <Link to="/inscription">Créer un compte</Link>
            <a href="#">Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;