// src/pages/MyAccountPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Importer les styles
import './MyAccountPage.css';
import '../components/FormControls.css';
import '../components/FormStatus.css';

const API_BASE_URL = 'http://localhost:3001'; 

function MyAccountPage() {
  const { authState, logout, login } = React.useContext(AuthContext); 
  const navigate = useNavigate();

  // 1. Gérer les états des formulaires
  const [profileData, setProfileData] = React.useState({
    name: '',
    username: '',
  });
  const [passwordData, setPasswordData] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [status, setStatus] = React.useState({ message: '', type: '' }); 
  const [isLoading, setIsLoading] = React.useState(false); 
  // Nouvel état pour le bouton de téléchargement
  const [isDownloading, setIsDownloading] = React.useState(false);
  
  // --- NOUVEL ÉTAT POUR LA MODALE ---
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // --- FIN ---

  // 2. Gérer la visibilité des mots de passe
  const [showOld, setShowOld] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  // 3. Décoder le token pour obtenir les infos utilisateur
  const userData = React.useMemo(() => {
    try {
      if (authState.token) {
        return jwtDecode(authState.token);
      }
    } catch (error) {
      console.error("Token invalide:", error);
      logout(); 
      navigate('/connexion');
      return null;
    }
  }, [authState.token, logout, navigate]);

  // 4. Remplir le formulaire de profil avec les données du token
  React.useEffect(() => {
    if (userData) {
      setProfileData({
        name: userData.name || '',
        username: userData.username || '',
      });
    }
  }, [userData]);

  // Fonction utilitaire pour effectuer des requêtes sécurisées
  const apiCall = async (endpoint, method, body = null) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.token}`,
    };
    
    const options = {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    };

    return fetch(`${API_BASE_URL}/api${endpoint}`, options);
  };


  // 5. Gérer la soumission du profil
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', type: '' });
    setIsLoading(true);

    try {
      const response = await apiCall('/users/profile', 'PUT', profileData);
      const data = response.status === 204 ? {} : await response.json();

      if (response.ok) {
        login(data.token, authState.rememberMe); 
        setStatus({ message: data.message, type: 'success' });
      } else {
        setStatus({ message: data.message || 'Erreur lors de la mise à jour du profil.', type: 'error' });
      }

    } catch (error) {
      console.error("Erreur réseau/API:", error);
      setStatus({ message: 'Problème de connexion au serveur.', type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus({ message: '', type: '' }), 4000);
    }
  };

  // 6. Gérer la soumission du mot de passe
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', type: '' });
    setIsLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus({ message: 'Les nouveaux mots de passe ne correspondent pas.', type: 'error' });
      setIsLoading(false);
      setTimeout(() => setStatus({ message: '', type: '' }), 4000);
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
        setStatus({ message: 'Le nouveau mot de passe doit contenir au moins 6 caractères.', type: 'error' });
        setIsLoading(false);
        setTimeout(() => setStatus({ message: '', type: '' }), 4000);
        return;
    }


    try {
      const response = await apiCall('/users/password', 'PUT', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      const data = response.status === 204 ? {} : await response.json();

      if (response.ok) {
        setStatus({ message: data.message, type: 'success' });
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Vider les champs
      } else {
        setStatus({ message: data.message || 'Erreur lors du changement de mot de passe.', type: 'error' });
      }

    } catch (error) {
      console.error("Erreur réseau/API:", error);
      setStatus({ message: 'Problème de connexion au serveur.', type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus({ message: '', type: '' }), 4000);
    }
  };

  // --- NOUVELLE FONCTION : TÉLÉCHARGEMENT DES DONNÉES ---
  const handleDownloadData = async () => {
    setIsDownloading(true);
    setStatus({ message: '', type: '' });

    try {
      const response = await apiCall('/users/my-data', 'GET');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors du téléchargement');
      }

      // 1. Récupérer le nom du fichier depuis les headers (fallback)
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'foodmood_data.json'; // Nom par défaut
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch.length > 1) {
          filename = filenameMatch[1];
        }
      }

      // 2. Transformer la réponse en "blob" (un fichier)
      const blob = await response.blob();
      
      // 3. Créer un lien temporaire pour le téléchargement
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename; // Utilise le nom de fichier dynamique
      
      // 4. Simuler le clic pour télécharger
      document.body.appendChild(a);
      a.click();
      
      // 5. Nettoyer
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error("Erreur téléchargement données:", error);
      setStatus({ message: error.message, type: 'error' });
    } finally {
      setIsDownloading(false);
    }
  };
  // --- FIN DE LA NOUVELLE FONCTION ---

  // 7. Gérer la suppression de compte
  const handleDeleteAccount = async () => {
    // --- MODIFIÉ : Ouvre la modale au lieu de confirmer ---
    setIsModalOpen(true);
    // --- FIN MODIFICATION ---
  };

  // --- NOUVELLE FONCTION : LOGIQUE DE SUPPRESSION (exécutée par la modale) ---
  const confirmDeleteAccount = async () => {
    setIsModalOpen(false); // Ferme la modale
    setIsLoading(true);

    try {
      const response = await apiCall('/users/account', 'DELETE');

      if (response.status === 204) {
        // Suppression réussie. Déconnexion et redirection.
        // On utilise alert() ici car l'utilisateur va être déconnecté
        // On ne peut plus compter sur l'état React.
        alert("Votre compte a été définitivement supprimé.");
        logout();
        navigate('/');
      } else {
        const data = await response.json();
        setStatus({ message: data.message || 'Erreur lors de la suppression du compte.', type: 'error' });
      }

    } catch (error) {
      console.error("Erreur réseau/API:", error);
      setStatus({ message: 'Problème de connexion au serveur.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  // --- FIN DE LA NOUVELLE FONCTION ---


  if (!userData) {
    return null; 
  }

  return (
    <div className="account-page-container">
      <title>Mon Compte - FoodMood</title>
      <meta name="description" content="Gérez vos informations personnelles, votre mot de passe et votre compte FoodMood." />

      <h1>Mon Compte</h1>
      
      {/* Affichage global du statut */}
      {(status.message && status.type === 'error') && (
        <p className={`form-status ${status.type} visible`} style={{ marginBottom: '20px' }}>
          {status.message}
        </p>
      )}

      {/* --- Section Informations Personnelles --- */}
      <form onSubmit={handleProfileSubmit}>
        <div className="account-section">
          <div className="account-section-header">
            <h2>Informations Personnelles</h2>
          </div>
          <div className="account-section-body">
            <div className="form-group">
              <label htmlFor="email">Email (non modifiable)</label>
              <input 
                type="email" 
                id="email" 
                value={userData.email} 
                disabled 
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input 
                type="text" 
                id="name" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input 
                type="text" 
                id="username" 
                value={profileData.username}
                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
              />
            </div>
          </div>
          <div className="account-section-footer">
            {/* AFFICHAGE DU STATUT POUR LE PROFIL */}
            {(status.message && (status.message.includes('Profil') || status.message.includes('utilisateur'))) && (
                <p className={`form-status ${status.type} visible`} style={{marginTop: 0, width: '100%', textAlign:'left'}}>
                    {status.message}
                </p>
            )}
            <button type="submit" className="account-save-button" disabled={isLoading}>
              {isLoading && (status.message.includes('Profil') || status.message.includes('utilisateur')) ? 'Chargement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </div>
      </form>

      {/* --- Section Mot de passe --- */}
      <form onSubmit={handlePasswordSubmit}>
        <div className="account-section">
          <div className="account-section-header">
            <h2>Changer le mot de passe</h2>
          </div>
          <div className="account-section-body">
            <div className="form-group">
              <label htmlFor="oldPassword">Ancien mot de passe</label>
              <div className="password-input-wrapper">
                <input 
                  type={showOld ? 'text' : 'password'}
                  id="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                  required
                />
                <span onClick={() => setShowOld(!showOld)} className="password-toggle-icon">
                  {showOld ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <div className="password-input-wrapper">
                <input 
                  type={showNew ? 'text' : 'password'}
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                />
                <span onClick={() => setShowNew(!showNew)} className="password-toggle-icon">
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <div className="password-input-wrapper">
                <input 
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                />
                <span onClick={() => setShowConfirm(!showConfirm)} className="password-toggle-icon">
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
          <div className="account-section-footer">
            {(status.message && status.message.includes('Mot de passe')) && (
                <p className={`form-status ${status.type} visible`} style={{marginTop: 0, width: '100%', textAlign:'left'}}>
                    {status.message}
                </p>
            )}
            <button type="submit" className="account-save-button" disabled={isLoading}>
              {isLoading && status.message.includes('Mot de passe') ? 'Chargement...' : 'Changer le mot de passe'}
            </button>
          </div>
        </div>
      </form>

      {/* --- NOUVELLE SECTION : RGPD / DONNÉES --- */}
      <div className="account-section">
        <div className="account-section-header">
          <h2>Confidentialité et Données</h2>
        </div>
        <div className="account-section-body">
          <p style={{margin: 0, lineHeight: 1.6, color: 'var(--body-text)'}}>
            Conformément au RGPD, vous pouvez télécharger une copie de vos
            données personnelles (nom, nom d'utilisateur et email) que
            nous stockons.
          </p>
        </div>
        <div className="account-section-footer">
          <button 
            onClick={handleDownloadData} 
            className="account-download-button" 
            disabled={isDownloading}
          >
            {isDownloading ? 'Téléchargement...' : 'Télécharger mes données'}
          </button>
        </div>
      </div>
      {/* --- FIN DE LA NOUVELLE SECTION --- */}


      {/* --- Section Zone de Danger --- */}
      <div className="account-section danger-zone">
        <div className="account-section-header">
          <h2>Zone de Danger</h2>
        </div>
        <div className="account-section-body">
          <p>
            La suppression de votre compte est définitive. Toutes vos données
            seront perdues et ne pourront pas être récupérées.
          </p>
        </div>
        <div className="account-section-footer">
          <button onClick={handleDeleteAccount} className="delete-account-button" disabled={isLoading}>
            Supprimer mon compte
          </button>
        </div>
      </div>

      {/* --- NOUVELLE MODALE DE CONFIRMATION --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirmer la suppression</h2>
            </div>
            <div className="modal-body">
              <p>
                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action
                est irréversible et entraînera la déconnexion immédiate.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="modal-button-cancel"
                disabled={isLoading}
              >
                Annuler
              </button>
              <button 
                onClick={confirmDeleteAccount} 
                className="modal-button-confirm"
                disabled={isLoading}
              >
                {isLoading ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- FIN DE LA MODALE --- */}

    </div>
  );
}

export default MyAccountPage;

