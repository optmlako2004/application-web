// src/pages/PrivacyPolicyPage.js
import React from 'react';
import './PrivacyPolicyPage.css'; // Nous allons créer ce fichier CSS juste après

function PrivacyPolicyPage() {
  return (
    <div className="policy-page-container">
      <title>Politique de Confidentialité - FoodMood</title>
      <meta
        name="description"
        content="Consultez la politique de confidentialité de FoodMood concernant la collecte et l'utilisation de vos données personnelles."
      />

      <div className="policy-header">
        <h1>Politique de Confidentialité</h1>
        <p className="last-updated">Dernière mise à jour : 31 octobre 2025</p>
      </div>

      <div className="policy-content">
        <p>
          Bienvenue sur FoodMood. Votre vie privée est importante pour nous. Cette
          politique de confidentialité explique comment nous collectons,
          utilisons, divulguons et protégeons vos informations lorsque vous
          utilisez notre site web et nos services.
        </p>

        <h2>1. Informations que nous collectons</h2>
        <p>
          Nous pouvons collecter des informations personnelles identifiables,
          telles que :
        </p>
        <ul>
          <li>
            <strong>Informations de compte :</strong> Votre nom, nom
            d'utilisateur, adresse e-mail et mot de passe (haché) lorsque vous
            créez un compte.
          </li>
          <li>
            <strong>Informations de contact :</strong> Si vous nous contactez
            via notre formulaire, nous collectons votre nom, votre e-mail et
            votre message.
          </li>
          <li>
            <strong>Données d'utilisation :</strong> Informations sur la façon
            dont vous interagissez avec notre site (pages visitées, recherches
            effectuées).
          </li>
        </ul>

        <h2>2. Comment nous utilisons vos informations</h2>
        <p>Nous utilisons les informations collectées pour :</p>
        <ul>
          <li>Fournir, exploiter et maintenir notre service.</li>
          <li>Améliorer, personnaliser et développer notre service.</li>
          <li>
            Vous répondre, que ce soit pour le service client ou pour vous
            fournir des mises à jour.
          </li>
          <li>
            Traiter vos transactions (bien que nous ne traitions pas les
            paiements directement pour le moment).
          </li>
          <li>Sécuriser la plateforme et prévenir la fraude.</li>
        </ul>

        <h2>3. Partage de vos informations</h2>
        <p>
          Nous ne vendons, n'échangeons ni ne louons vos informations
          personnelles à des tiers. Nous pouvons partager des informations :
        </p>
        <ul>
          <li>
            Si la loi l'exige ou en réponse à des demandes valides des
            autorités publiques.
          </li>
          <li>
            Avec des fournisseurs de services tiers qui nous aident à exploiter
            notre site (par exemple, hébergement, analyse de données), mais ils
            sont tenus de garder ces informations confidentielles.
          </li>
        </ul>

        <h2>4. Sécurité de vos données</h2>
        <p>
          La sécurité de vos données est une priorité. Nous utilisons des
          mesures de sécurité standard de l'industrie, telles que le hachage
          des mots de passe (bcrypt) et des connexions sécurisées (HTTPS est
          attendu en production) pour protéger vos informations. Cependant,
          aucune méthode de transmission sur Internet n'est sécurisée à 100%.
        </p>

        <h2>5. Vos droits</h2>
        <p>
          Conformément à la réglementation (RGPD), vous disposez de droits sur
          vos données personnelles :
        </p>
        <ul>
          <li>
            <strong>Droit d'accès :</strong> Vous pouvez demander une copie des
            données que nous détenons sur vous (via votre page "Mon Compte").
          </li>
          <li>
            <strong>Droit de rectification :</strong> Vous pouvez modifier vos
            informations personnelles à tout moment depuis votre page "Mon
            Compte".
          </li>
          <li>
            <strong>Droit à l'effacement :</strong> Vous pouvez supprimer
            votre compte à tout moment depuis votre page "Mon Compte", ce qui
            entraînera la suppression de vos données personnelles.
          </li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          Nous utilisons des cookies pour le fonctionnement essentiel du site,
          notamment pour maintenir votre session de connexion (via le stockage
          local ou de session pour votre token d'authentification). Nous
          n'utilisons pas de cookies de suivi publicitaire tiers pour le
          moment.
        </p>

        <h2>7. Modifications de cette politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique de temps à autre. Nous
          vous notifierons de tout changement en publiant la nouvelle politique
          sur cette page.
        </p>

        <h2>8. Nous contacter</h2>
        <p>
          Si vous avez des questions sur cette politique de confidentialité,
          veuillez nous contacter via notre{' '}
          <a href="/contact">formulaire de contact</a>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;