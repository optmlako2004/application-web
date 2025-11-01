<?php
// On indique que la réponse sera en JSON
header('Content-Type: application/json');

// 1. Récupérer les données envoyées par React
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Sécurité basique : s'assurer que les données sont là
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'Veuillez remplir tous les champs.']);
    exit;
}

// -----------------------------------------------------------------
// A. PRÉPARATION DE L'EMAIL POUR VOUS (L'ADMIN)
// -----------------------------------------------------------------
$to_admin = "contact@foodmoodfrance.fr";
$subject_admin = "Nouveau message de contact - " . htmlspecialchars($data['name']);

$message_admin = "Vous avez reçu un nouveau message de votre formulaire de contact :\n\n";
$message_admin .= "Nom: " . htmlspecialchars($data['name']) . "\n";
$message_admin .= "Email: " . htmlspecialchars($data['email']) . "\n\n";
$message_admin .= "Message:\n" . htmlspecialchars($data['message']);

// Headers pour l'email admin (IMPORTANT pour pouvoir "Répondre à")
// --- MODIFICATION ICI ---
$headers_admin = "From: \"FoodMood\" <no-reply@foodmoodfrance.fr>\r\n"; // Email de votre serveur
$headers_admin .= "Reply-To: " . htmlspecialchars($data['email']) . "\r\n"; // Email de l'utilisateur
$headers_admin .= "Content-Type: text/plain; charset=UTF-8\r\n";

// -----------------------------------------------------------------
// B. PRÉPARATION DE L'EMAIL DE RÉPONSE AUTO (POUR L'UTILISATEUR)
// -----------------------------------------------------------------
$to_user = htmlspecialchars($data['email']);
$subject_user = "Merci de nous avoir contactés ! | FoodMood";

// !!! ATTENTION !!!
// Mettez votre logo (ex: logo-email.png) dans votre dossier /public/
// Et remplacez l'URL ci-dessous par le lien complet
$logo_url = "https://foodmoodfrance.fr/logo.png"; // <-- MODIFIEZ CECI

// Message HTML pour l'utilisateur
$message_user = '
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { width: 90%; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
        .header { text-align: center; margin-bottom: 20px; }
        .header img { max-width: 150px; } /* Ajustez la taille de votre logo */
        .content { font-size: 16px; }
        .footer { margin-top: 20px; font-size: 12px; color: #888; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="' . $logo_url . '" alt="Logo FoodMood">
        </div>
        <div class="content">
            <p>Bonjour ' . htmlspecialchars($data['name']) . ',</p>
            <p>Merci de nous avoir contactés ! Nous avons bien reçu votre message et nous reviendrons vers vous dans les plus brefs délais.</p>
            <p>À très bientôt,<br>L\'équipe FoodMood</p>
        </div>
        <div class="footer">
            <p>&copy; ' . date('Y') . ' FoodMood. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
';

// Headers pour l'email utilisateur (IMPORTANT pour que le HTML s'affiche)
// --- MODIFICATION ICI ---
$headers_user = "From: \"FoodMood\" <contact@foodmoodfrance.fr>\r\n";
$headers_user .= "Reply-To: contact@foodmoodfrance.fr\r\n";
$headers_user .= "MIME-Version: 1.0\r\n";
$headers_user .= "Content-Type: text/html; charset=UTF-8\r\n";

// -----------------------------------------------------------------
// C. ENVOI DES DEUX EMAILS
// -----------------------------------------------------------------
try {
    // Envoi à l'admin
    $send_admin = mail($to_admin, $subject_admin, $message_admin, $headers_admin);
    // Envoi à l'utilisateur
    $send_user = mail($to_user, $subject_user, $message_user, $headers_user);

    if ($send_admin && $send_user) {
        // Succès !
        http_response_code(200);
        echo json_encode(['message' => 'Merci ! Votre message a bien été envoyé.']);
    } else {
        // Erreur d'envoi
        http_response_code(500);
        echo json_encode(['message' => 'Une erreur est survenue lors de l\'envoi de l\'email.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Une erreur serveur est survenue: ' . $e->getMessage()]);
}

exit;
?>