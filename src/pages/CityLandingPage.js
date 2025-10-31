// src/pages/CityLandingPage.js
import React, { useMemo, useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import './CityLandingPage.css'; 
import logo from '../assets/logo.png'; 
import '../components/FormStatus.css';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

// Coordonnées pour centrer la carte
const CITY_COORDS = {
  paris: { center: [48.86, 2.34], zoom: 12, name: 'Paris' },
  lyon: { center: [45.764, 4.8357], zoom: 12, name: 'Lyon' },
  marseille: { center: [43.2965, 5.3698], zoom: 12, name: 'Marseille' },
};

// Fonction pour générer 50 marqueurs aléatoires autour de Paris
const generateParisMarkers = () => {
  const markers = [];
  const [lat, lng] = CITY_COORDS.paris.center;
  const maxOffset = 0.05; 

  for (let i = 1; i <= 50; i++) {
    const randomLat = lat + (Math.random() * maxOffset * 2 - maxOffset);
    const randomLng = lng + (Math.random() * maxOffset * 2 - maxOffset);
    markers.push({ id: i, position: [randomLat, randomLng] });
  }
  return markers;
};

// Créer l'icône de marqueur personnalisé avec votre logo
const customIcon = L.icon({
  iconUrl: logo,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});


function CityLandingPage() {
  const { slug } = useParams();
  const city = CITY_COORDS[slug];

  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });

  // --- RÉCUPÉRATION DES DONNÉES UTILISATEUR ---
  const { authState } = useContext(AuthContext);

  const userData = useMemo(() => {
    try {
      if (authState.token) {
        return jwtDecode(authState.token);
      }
    } catch (error) {
      console.error("Token invalide:", error);
      return null;
    }
  }, [authState.token]);

  // --- PRÉ-REMPLISSAGE DE L'EMAIL ---
  useEffect(() => {
    if (userData && userData.email) {
      setEmail(userData.email);
    }
  }, [userData]);


  const handleChange = (event) => {
    // Le 'disabled' empêche le changement, mais on garde cette fonction
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ message: "Envoi en cours...", type: "loading" });
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', `Abonnement lancement ${city.name}`);
    formData.append('name', userData ? userData.name : 'Visiteur'); // Utilise le nom si connecté
    
    // --- MODIFICATION ICI ---
    // Ajout d'un champ "message" caché pour être compatible avec send-email.php
    formData.append('message', `Nouvel inscrit pour le lancement à ${city.name} : ${email}`);
    // --- FIN MODIFICATION ---

    try {
      const response = await fetch("https://foodmoodfrance.fr/send-email.php", { 
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          message: data.message, 
          type: "success",
        });
        if (!userData) { // Ne pas vider l'email si l'utilisateur est connecté
          setEmail(""); 
        }

        setTimeout(() => {
          setFormStatus({ message: "", type: "" });
        }, 5000);
      } else {
        setFormStatus({
          message: data.message || "Une erreur s'est produite...",
          type: "error",
        });
        setTimeout(() => setFormStatus({ message: "", type: "" }), 5000);
      }
    } catch (error) {
      console.error("Erreur de communication:", error);
      setFormStatus({
        message: "Une erreur de communication s'est produite.",
        type: "error",
      });
      setTimeout(() => setFormStatus({ message: "", type: "" }), 5000);
    }
  };


  // Générer les marqueurs UNIQUEMENT pour Paris
  const parisMarkers = useMemo(() => {
    return slug === 'paris' ? generateParisMarkers() : [];
  }, [slug]);


  if (!city) {
    return <div className="city-landing-page error-page"><h1>Ville non supportée</h1><Link to="/">Retour à l'accueil</Link></div>;
  }

  // --- CONTENU POUR LYON ET MARSEILLE ---
  if (slug !== 'paris') {
    return (
      <div className="city-landing-page coming-soon">
        <div className="landing-card">
          <h1>{city.name}, nous arrivons bientôt !</h1>
          <p>
            Nous préparons activement notre lancement à {city.name}. Bientôt, vous pourrez
            trouver plus de 50 food trucks sur notre application !
          </p>
          
          <form className="notification-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder={userData ? "" : "Laissez-nous votre email"}
              value={email}
              onChange={handleChange}
              required 
              disabled={!!userData} // Champ désactivé si l'utilisateur est connecté
            />
            
            <button type="submit" className="cta-button primary">Prévenez-moi du lancement</button>
          </form>

          <p
            className={`form-status ${formStatus.type} ${
              formStatus.message ? "visible" : ""
            }`}
          >
            {formStatus.message}
          </p>

          <Link to="/" className="back-link">&larr; Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  // --- CONTENU POUR PARIS (AVEC CARTE) ---
  return (
    <div className="city-landing-page map-view">
      <div className="landing-map-header">
        <h1>Découvrez les Food Trucks à {city.name}</h1>
        <p>Plus de 50 camions gourmets vous attendent !</p>
      </div>
      
      <div className="map-container-wrapper">
        <MapContainer
          center={city.center}
          zoom={city.zoom}
          scrollWheelZoom={true}
          className="city-leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {parisMarkers.map(marker => (
            <Marker 
              key={marker.id} 
              position={marker.position} 
              icon={customIcon}
            >
              <Popup>
                Food Truck #{marker.id} <br /> Disponible.
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>

      <div className="map-view-footer">
          <Link to="/food-trucks" className="cta-button primary">
            Voir la liste des Food Trucks
          </Link>
      </div>
    </div>
  );
}

export default CityLandingPage;

