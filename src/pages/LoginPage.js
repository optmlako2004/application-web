// src/pages/LoginPage.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Importer notre contexte
import "./LoginPage.css";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { login } = useContext(AuthContext); // Utiliser la fonction login du contexte
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
        login(data.token); // Appeler la fonction login du contexte avec le token
        navigate("/"); // Rediriger
      } else {
        alert(`Erreur : ${data.message}`);
      }
    } catch (err) {
      console.error("Erreur lors de la communication avec le serveur", err);
      alert("Impossible de communiquer avec le serveur.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">Connexion</h1>

        <form className="login-form" onSubmit={handleSubmit}>
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
