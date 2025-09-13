// src/pages/FindTrucksPage.js
import React from "react";
import { mockTrucks } from "../data/mockTrucks";
import "./FindTrucksPage.css";

// Importer les composants de la carte
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// Importer le CSS indispensable de Leaflet
import "leaflet/dist/leaflet.css";

// 1. Importer l'icône personnalisée et les outils de Leaflet
import L from "leaflet";
import foodTruckIconUrl from "../assets/food-truck.png"; // L'icône de votre food truck

// 2. Définir l'icône personnalisée
const customFoodTruckIcon = L.icon({
  iconUrl: foodTruckIconUrl,
  iconSize: [40, 40], // Taille de l'icône [largeur, hauteur]
  iconAnchor: [20, 40], // Point de l'icône qui correspond à la coordonnée [milieu bas]
  popupAnchor: [0, -40], // Point d'ancrage du popup par rapport à l'icône
});

function FindTrucksPage() {
  const mapCenter = [46.603354, 1.888334]; // Centre de la France

  return (
    <div className="find-trucks-page">
      <h1>Trouver un Food Truck</h1>

      {/* CARTE INTERACTIVE */}
      <div
        className="map-wrapper"
        style={{
          height: "500px",
          width: "100%",
          marginBottom: "50px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Ajouter un marqueur pour chaque food truck */}
          {mockTrucks.map((truck) => (
            <Marker
              key={truck.id}
              position={truck.position}
              icon={customFoodTruckIcon} // 3. Utiliser l'icône personnalisée ici
            >
              <Popup>
                <strong>{truck.name}</strong>
                <br />
                {truck.specialty}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* LISTE DES FICHES */}
      <div className="trucks-list">
        {mockTrucks.map((truck) => (
          <div key={truck.id} className="truck-card">
            <img
              src={truck.image}
              alt={truck.name}
              className="truck-card-image"
            />
            <div className="truck-card-content">
              <h3>{truck.name}</h3>
              <p className="specialty">{truck.specialty}</p>
              {truck.clickAndCollect && (
                <span className="click-collect-badge">
                  Click & Collect disponible
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindTrucksPage;
