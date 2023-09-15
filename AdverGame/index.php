    <?php
    // Vérifier si le formulaire a été soumis
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Récupérer les valeurs du formulaire
        $nom = $_POST["nom"];
        $email = $_POST["email"];

        // Afficher les données soumises
        echo "<p>Nom : $nom</p>";
        echo "<p>E-mail : $email</p>";

        // Vous pouvez également enregistrer ces données dans une base de données ou effectuer d'autres actions de traitement ici.
    }
    ?>.
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire PHP</title>
</head>
<body>
    <h1>Formulaire PHP</h1>
    

    <form method="post" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="nom"> Nom :</label>
        <input type="text" id="nom" name="nom" required><br><br>

        <label for="email"> E-mail :</label>
        <input type="email" id="email" name="email" required><br><br>

        <input type="submit" value="Envoyer">
    </form>
</body>
</html>