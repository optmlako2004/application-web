// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ce composant détecte les changements de route et remonte la fenêtre en haut de page.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Exécute cette fonction à chaque fois que le 'pathname' (l'URL) change.
    window.scrollTo(0, 0);
  }, [pathname]);

  // Ce composant ne rend aucun élément visible sur la page.
  return null;
}

export default ScrollToTop;