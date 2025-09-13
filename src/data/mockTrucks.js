// src/data/mockTrucks.js

// Pour les images, nous allons les importer plus tard.
// Pour l'instant, laissez ces lignes telles quelles.
import burgerTruckImg from "../assets/truck-burger.jpg";
import pizzaTruckImg from "../assets/truck-pizza.jpg";
import crepesTruckImg from "../assets/truck-crepes.jpg";

export const mockTrucks = [
  {
    id: 1,
    name: "Le Burger du Chef",
    specialty: "Burgers Gourmets",
    image: burgerTruckImg,
    position: [48.8566, 2.3522], // Coordonnées de Paris
    menu: [
      { item: "Burger Classique", price: "12,50€" },
      { item: "Burger Végétarien", price: "13,00€" },
      { item: "Frites Maison", price: "4,00€" },
    ],
    clickAndCollect: true,
  },
  {
    id: 2,
    name: "Pizza Presto",
    specialty: "Pizzas au feu de bois",
    image: pizzaTruckImg,
    position: [45.764, 4.8357], // Coordonnées de Lyon
    menu: [
      { item: "Pizza Margherita", price: "11,00€" },
      { item: "Pizza Regina", price: "13,50€" },
      { item: "Tiramisu", price: "5,00€" },
    ],
    clickAndCollect: false,
  },
  {
    id: 3,
    name: "La Crêpe Vagabonde",
    specialty: "Crêpes et Galettes",
    image: crepesTruckImg,
    position: [43.2965, 5.3698], // Coordonnées de Marseille
    menu: [
      { item: "Galette Complète", price: "9,50€" },
      { item: "Crêpe Nutella", price: "5,00€" },
      { item: "Cidre Brut", price: "3,50€" },
    ],
    clickAndCollect: true,
  },
];
