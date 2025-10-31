// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// --- 1. Import de Google ---
import { GoogleOAuthProvider } from '@react-oauth/google';

import "aos/dist/aos.css";
import AOS from "aos";

// Importer les composants et les pages
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ScrollToTop from "./components/ScrollToTop.js";
import ProtectedRoute from "./components/ProtectedRoute.js"; 

// Importer les pages
import HomePage from "./pages/HomePage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import FindTrucksPage from "./pages/FindTrucksPage.js";
import BlogPage from "./pages/BlogPage.js";
import SinglePostPage from "./pages/SinglePostPage.js";
import ContactPage from "./pages/ContactPage.js";
import AboutPage from "./pages/AboutPage.js";
import ProfessionalPage from "./pages/ProfessionalPage.js";
import MenuPage from "./pages/MenuPage.js";
import MyAccountPage from "./pages/MyAccountPage.js"; 
import CityLandingPage from "./pages/CityLandingPage.js"; 
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

// --- 2. Récupérer la clé depuis le fichier .env ---
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// --------------------------------------------------


// Composant interne pour gérer l'affichage
function AppContent() {
  const location = useLocation(); 
  const hideFooterOn = "/mon-compte";

  return (
    <div className="App">
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FoodMood",
            "url": "https://foodmoodfrance.fr",
            "logo": "https://foodmoodfrance.fr/logo.png"
          }
        `}
      </script>
      
      <Header />
      <ScrollToTop />

      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<RegisterPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        
        <Route path="/food-trucks" element={<FindTrucksPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SinglePostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/espace-professionnel" element={<ProfessionalPage />} />
        
        <Route path="/ville/:slug" element={<CityLandingPage />} />
        <Route path="/politique-de-confidentialite" element={<PrivacyPolicyPage />} />


        {/* Route Protégée */}
        <Route 
          path="/mon-compte" 
          element={
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          } 
          
        />
      </Routes>

      {location.pathname !== hideFooterOn && <Footer />}
    </div>
  );
}

// Composant principal
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    // --- 3. Entourer l'application avec le fournisseur Google ---
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </GoogleOAuthProvider>
    // -----------------------------------------------------------
  );
}

export default App;

