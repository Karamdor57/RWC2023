<?php
// Connexion à la base de données (assurez-vous d'utiliser vos propres informations de connexion)
$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$base_de_donnees = "rugby";

$connexion = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees);

// Vérifier la connexion
if ($connexion->connect_error) {
    die("La connexion à la base de données a échoué : " . $connexion->connect_error);
}

// Récupérer les valeurs du formulaire
$nom = $_POST["nom"];
$email = $_POST["email"];

// Préparer et exécuter la requête d'insertion
$insertion = "INSERT INTO utilisateurs (nom, email) VALUES ('$nom', '$email')";

if ($connexion->query($insertion) === TRUE) {
    echo "Les données ont été enregistrées avec succès dans la base de données.";
} else {
    echo "Erreur lors de l'enregistrement des données : " . $connexion->error;
}

// Fermer la connexion
$connexion->close();
?>