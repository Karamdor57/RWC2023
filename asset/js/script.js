const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('#start-button'),
    win: document.querySelector('.win'),
    restart: document.querySelector('#restartButton'),
    infoForm: document.getElementById('info-form'),
    submitInfoButton: document.getElementById('submit-info-button')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)

        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')  
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }
    
    const emojis = ['<img src="../RWC2023/rugbylogo/Fiji_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Afrique_du_sud_logo_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Angleterre_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Argentine_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Chilie_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Scottish_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/france_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Irish_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Italie_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Japon_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Nouvelle-Zelande_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Georgie_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Namibia_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Portugal_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Roumania_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Samoa_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Tonga_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Uruguay_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Wales_Rugby.png" alt="">','<img src="../RWC2023/rugbylogo/Wallabies_Rugby.png" alt="">',]
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html');
    selectors.board.replaceWith(parser.querySelector('.board'));
    selectors.board = document.querySelector('.board');

    // const parser = new DOMParser().parseFromString(cards, 'text/html')

    // selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')
    selectors.restart.classList.remove('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `Time: ${state.totalTime} sec`
    }, 1000)
}
// const resetGame = () => {
//     // Réinitialiser l'état
//     state.gameStarted = false;
//     state.flippedCards = 0;
//     state.totalFlips = 0;
//     state.totalTime = 0;
//     clearInterval(state.loop);

//     // Mettre à jour l'interface utilisateur
//     selectors.moves.innerText = `0 moves`;
//     selectors.timer.innerText = `Time: 0 sec`;
//     selectors.start.classList.remove('disabled');
//     selectors.restart.classList.add('disabled');

//     // Générer un nouveau tableau de jeu
//     generateGame();
// };

document.addEventListener("DOMContentLoaded", function() {
    // Trouver le bouton par son identifiant
    const restartButton = document.getElementById("restartButton");
  
    // Ajouter un événement "click" au bouton
    restartButton.addEventListener("click", function() {
      // Recharge la page
      location.reload();
    });
  });
const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;  // Ignorer si la carte est déjà retournée ou appariée
    }
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) 
    {  
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
    }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
            // Appel de la fonction pour afficher la fenêtre de saisie
        showInfoForm();
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) 
        {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) 
        {
            startGame()
        } else if (eventTarget.id === 'restart-button' && !eventTarget.className.includes('disabled')) 
        {
            resetGame();
        }
    });
};

generateGame()
attachEventListeners()

// À l'endroit où vous attachez les gestionnaires d'événements
selectors.submitInfoButton.addEventListener('click', () => {
    // Récupérez les données du formulaire
    const playerName = document.getElementById('name').value;
    const playerEmail = document.getElementById('email').value;

    // Vous pouvez maintenant utiliser playerName et playerEmail comme vous le souhaitez, par exemple, les envoyer à un serveur ou les stocker localement.

    // Stockez les données dans le localStorage
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('playerEmail', playerEmail);

    // Confirmez que les informations ont été enregistrées
    alert('Informations enregistrées avec succès !');

    // Cachez la fenêtre de saisie des informations
    selectors.infoForm.style.display = 'none';
});

// Récupérer les données du localStorage lorsque la page se charge
window.addEventListener('load', () => {
    const playerName = localStorage.getItem('playerName');
    const playerEmail = localStorage.getItem('playerEmail');

    // Vérifier si les valeurs existent
    if (playerName && playerEmail) {
        // Vous pouvez utiliser playerName et playerEmail comme bon vous semble ici
        console.log(`Nom du joueur : ${playerName}`);
        console.log(`Adresse e-mail du joueur : ${playerEmail}`);
    }
});
// Fonction pour afficher la fenêtre de saisie des informations
function showInfoForm() {
    selectors.infoForm.style.display = 'block';
}

