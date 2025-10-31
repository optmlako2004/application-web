// src/pages/FindTrucksPage.js
import React from "react";
import { mockTrucks } from "../data/mockTrucks";
import "./FindTrucksPage.css";

// Importer les composants de la carte
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import logoIconUrl from "../assets/logo.png";

const customFoodTruckIcon = L.icon({
  iconUrl: logoIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// === MODIFICATION ===
// On ne filtre plus, on modifie les données
// On déplace les camions de Lyon (id 2) et Marseille (id 3) à Paris pour la démo
const activeTrucks = mockTrucks.map(truck => {
  if (truck.id === 2) { // Pizza Presto (Lyon)
    return {
      ...truck,
      position: [48.865, 2.34], // Position à Paris (près du 1er)
     
    };
  }
  if (truck.id === 3) { // La Crêpe Vagabonde (Marseille)
    return {
      ...truck,
      position: [48.850, 2.35], // Position à Paris (près du 1er)
      
    };
  }
  return truck; // Le Burger du Chef (id 1) reste tel quel
});
// === FIN DE LA MODIFICATION ===


function FindTrucksPage() {
  const mapCenter = [48.8566, 2.3522]; // Centre sur Paris

  return (
    <div className="find-trucks-page">
      <title>Trouver un Food Truck - Carte Interactive | FoodMood</title>
      <meta
        name="description"
        content="Explorez la carte interactive de FoodMood pour trouver les meilleurs food trucks près de chez vous en temps réel. Localisez, choisissez et savourez."
      />

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
          zoom={12} // Zoom plus proche sur Paris
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Affiche les 3 camions (maintenant tous à Paris) */}
          {activeTrucks.map((truck) => (
            <Marker
              key={truck.id}
              position={truck.position}
              icon={customFoodTruckIcon}
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
        {/* Affiche les 3 fiches */}
        {activeTrucks.map((truck) => (
          <div key={truck.id} className="truck-card">
            <img
              src={truck.image}
              alt={truck.name}
              className="truck-card-image"
            />
            <div className="truck-card-content">
              <h3>{truck.name}</h3>
              <p className="specialty">{truck.specialty}</p>

              {/* === AJOUT DE LA NOTE "BIENTÔT" === */}
              {truck.note && (
                <p className="truck-note">{truck.note}</p>
              )}
              {/* === FIN DE L'AJOUT === */}

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