// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // 1. Importer les outils de routing

// Importer les styles et la logique d'animation
import "aos/dist/aos.css";
import AOS from "aos";

// Importer les composants et les pages
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomePage from "./pages/HomePage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import FindTrucksPage from "./pages/FindTrucksPage.js";
import BlogPage from "./pages/BlogPage.js";
import SinglePostPage from "./pages/SinglePostPage.js";
import ContactPage from "./pages/ContactPage.js";
import AboutPage from "./pages/AboutPage.js";
import ProfessionalPage from "./pages/ProfessionalPage.js";
import ScrollToTop from "./components/ScrollToTop.js";

// Composant principal de l'application

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    // 2. Encadrer toute l'application avec BrowserRouter
    <BrowserRouter>
      <div className="App">
        <Header />
        <ScrollToTop />

        {/* 3. Définir la zone où les pages changeront */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/food-trucks" element={<FindTrucksPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<SinglePostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/espace-professionnel" element={<ProfessionalPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
