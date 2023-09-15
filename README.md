<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mémorie RUGBY</title>
    <link rel="stylesheet" href="asset/css/style.css">
</head>
<body>
    <section id="background" class="background">
    <div class="video-background">
        <video  autoplay muted loop>
          <source src="vidéo/Rugbys greatest stage awaits!  Rugby World Cup 2023 Opening Titles.mp4" type="video/mp4">
          <!-- Ajoute d'autres sources si tu veux supporter différents formats de vidéo--> 
        </video>
        </div>
    </section>
    <div class="game">
        <div class="controls">
            <button id="start-button">Start</button>
            <button id="restart-button" class="disabled">Restart</button>
            <div class="stats">
                <div class="moves">0 moves</div>
                <div class="timer">Time: 0 sec</div>
            </div>
        </div>
        <div class="board-container">
            <div class="board" data-dimension="4"></div>
            <div class="win hidden">
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">0</span> moves<br />
                    under <span class="highlight">0</span> seconds
                </span>
                <button id="submit-button">Submit</button>
            </div>
        </div>
        <div id="info-form" class="hidden">
            <h2>Merci d'avoir jouer! Veuillez entrer vos Information</h2>
            <label for="name">Nom:</label>
            <input type="text" id="name" required>
            <label for="email">Mail:</label>
            <input type="email" id="email" required>
            <button id="submit-info-button">Envoyer</button>
        </div>
    </div>
    <script src="asset/js/script.js" defer></script>
</body>
</html>
