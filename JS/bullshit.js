//bullshit card game

let cardDeck = ["card-deck-css/images/hearts/hearts-A.svg", "card-deck-css/images/hearts/hearts-r02.svg",
    "card-deck-css/images/hearts/hearts-r03.svg", "card-deck-css/images/hearts/hearts-r04.svg", "card-deck-css/images/hearts/hearts-r05.svg",
    "card-deck-css/images/hearts/hearts-r06.svg", "card-deck-css/images/hearts/hearts-r07.svg", "card-deck-css/images/hearts/hearts-r08.svg",
    "card-deck-css/images/hearts/hearts-r09.svg", "card-deck-css/images/hearts/hearts-r10.svg", "card-deck-css/images/hearts/hearts-J.svg",
    "card-deck-css/images/hearts/hearts-Q.svg", "card-deck-css/images/hearts/hearts-K.svg"];

let shuffledDeck = [];
let cardsInPlay = [];
let submittedCards = [];
let playerText = document.getElementById('player-text');
let playerHand = document.getElementById('player-hand');
let startingAce;
let turn = 0;
let round = 0; 
let clickCount = 0;
let cardRank = 0;

// let bullshit = 0;
let truthButton = document.createElement('button');
let falseButton = document.createElement('button');
truthButton.innerHTML = 'Truth';
falseButton.innerHTML = 'Bullshit';

let playerOne = {
    number: "One",
    hand: []
}

let playerTwo = {
    number: "Two",
    hand: []
}

let playerThree = {
    number: "Three",
    hand: []
}

let playerFour = {
    number: "Four",
    hand: []
}

function trackTurn() {
    clickCount = (clickCount + 1)
    if(clickCount % 4 == 0){
        turn = (((turn + 1 ) % 4) + 1) % 4;
      } else {
        turn = ((turn + 1 ) % 4);
      }
}

function trackCard() {
    clickCount = (clickCount + 1)
    if(clickCount % 13 == 0){
        cardRank = (((cardRank + 1 ) % 13) + 1) % 13;
      } else {
        cardRank = ((cardRank + 1 ) % 13);
      }
}

function clearPlayerHand() {
    if (document.getElementById("player-hand").hasChildNodes()) {
        var resetScene = document.getElementById("player-hand");

        while (resetScene.hasChildNodes()) {
            resetScene.removeChild(resetScene.firstChild);
        }
    }
}

function clearButtons() {
    if (document.getElementById("buttons").hasChildNodes()) {
        var resetScene = document.getElementById("buttons");

        while (resetScene.hasChildNodes()) {
            resetScene.removeChild(resetScene.firstChild);
        }
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------

shuffleDeckFxn();

function shuffleDeckFxn() {
    playerOne.hand = [];
    playerTwo.hand = [];
    playerThree.hand = [];
    playerFour.hand = [];
    shuffledDeck = [];
    cardsInPlay = [];
    submittedCards = [];
    while (shuffledDeck.length < 52) {
        let randomCard = Math.floor((Math.random() * 52) + 1);
        if (!shuffledDeck.includes(randomCard)) {
            shuffledDeck.push(randomCard);
        }
    }
    console.log("Shuffled  deck " + shuffledDeck);
    dealPlayers(playerOne.hand)
    dealPlayers(playerTwo.hand)
    dealPlayers(playerThree.hand)
    dealPlayers(playerFour.hand)
    startButton()
}

function dealPlayers(playerHand) {
    while (playerHand.length < 13) {
        playerHand.push(shuffledDeck.shift());
    }
    console.log("player one hand " + playerHand);
    console.log("remaining deck " + shuffledDeck);
}

function startButton() {
    let startButt = document.createElement('button');
    startButt.setAttribute('id', 'start-button');
    startButt.innerHTML = 'Start the Lies!';
    document.getElementById('buttons').appendChild(startButt);
    startButt.addEventListener('click', startGame);
}

function startGame() {
    clearButtons()
    document.getElementById('cards-in-play-text').innerHTML = 'Cards In Play';
    startingAce = document.createElement('img');
    startingAce.setAttribute('src', cardDeck[0]);
    cardsInPlay.push(0);
    console.log("cards in play: " + cardsInPlay);
    document.getElementById('card-in-play').appendChild(startingAce);
    readyPlayer(playerOne)
}

function readyPlayer(player) {
    playerText.innerHTML = `Player ${player.number}`;
    let readyButton = document.createElement('button');
    readyButton.innerHTML = `Ready Player ${player.number}?`;
    document.getElementById("buttons").appendChild(readyButton);

    for (let i = 0; i < player.hand.length; i++) {
        let cardBlankOne = document.createElement('img');
        cardBlankOne.setAttribute('src', 'card-deck-css/images/backs/red.svg');
        document.getElementById("player-hand").appendChild(cardBlankOne);
    }
    readyButton.addEventListener('click', function() {translateNumToCard(player)} );
}

function displayTargetCard(idx) {
    let cardStageOne = document.createElement('img');
    cardStageOne.setAttribute('src', cardDeck[idx]);
    cardStageOne.setAttribute('data-id', idx);
    document.getElementById("player-hand").appendChild(cardStageOne);
    cardStageOne.addEventListener('click', readySubmitCards);
}

function translateNumToCard(player) {
    console.log('turn is now: ' + turn)
    clearPlayerHand()
    clearButtons()
    for (let i = 0; i < player.hand.length; i++) {
        if (player.hand[i] === 1 || player.hand[i] === 14 || player.hand[i] === 27 || player.hand[i] === 40) {
            displayTargetCard(0);
        }
        else if (player.hand[i] === 2 || player.hand[i] === 15 || player.hand[i] === 28 || player.hand[i] === 41) {
            displayTargetCard(1)
        }
        else if (player.hand[i] === 3 || player.hand[i] === 16 || player.hand[i] === 29 || player.hand[i] === 42) {
            displayTargetCard(2)
        }
        else if (player.hand[i] === 4 || player.hand[i] === 17 || player.hand[i] === 30 || player.hand[i] === 43) {
            displayTargetCard(3)
        }
        else if (player.hand[i] === 5 || player.hand[i] === 18 || player.hand[i] === 31 || player.hand[i] === 44) {
            displayTargetCard(4)
        }
        else if (player.hand[i] === 6 || player.hand[i] === 19 || player.hand[i] === 32 || player.hand[i] === 45) {
            displayTargetCard(5)
        }
        else if (player.hand[i] === 7 || player.hand[i] === 20 || player.hand[i] === 33 || player.hand[i] === 46) {
            displayTargetCard(6)
        }
        else if (player.hand[i] === 8 || player.hand[i] === 21 || player.hand[i] === 34 || player.hand[i] === 47) {
            displayTargetCard(7)
        }
        else if (player.hand[i] === 9 || player.hand[i] === 22 || player.hand[i] === 35 || player.hand[i] === 48) {
            displayTargetCard(8)
        }
        else if (player.hand[i] === 10 || player.hand[i] === 23 || player.hand[i] === 36 || player.hand[i] === 49) {
            displayTargetCard(9)
        }
        else if (player.hand[i] === 11 || player.hand[i] === 24 || player.hand[i] === 37 || player.hand[i] === 50) {
            displayTargetCard(10)
        }
        else if (player.hand[i] === 12 || player.hand[i] === 25 || player.hand[i] === 38 || player.hand[i] === 51) {
            displayTargetCard(11)
        }
        else if (player.hand[i] === 13 || player.hand[i] === 26 || player.hand[i] === 39 || player.hand[i] === 52) {
            displayTargetCard(12)
        }
    }
    let submitButton = document.createElement('button');
    submitButton.innerHTML = 'Submit Cards';
    submitButton.setAttribute('id', 'submit-button');
    document.getElementById("buttons").appendChild(submitButton);
}

function readySubmitCards() {
    if (submittedCards.length >= 4) return
    if (this.getAttribute('src') === 'card-deck-css/images/backs/red.svg') return
    this.setAttribute('src', 'card-deck-css/images/backs/red.svg');
    submittedCards.push(parseInt(this.getAttribute('data-id')));
    document.getElementById('submit-button').addEventListener('click', submitCards);
    console.log("Cards submitted: " + submittedCards);
}

function submitCards() {
    submittedCards.forEach(element => cardsInPlay.push(element));
    console.log("cards in play: " + cardsInPlay)
    startingAce.setAttribute('src', 'card-deck-css/images/backs/red.svg');
    clearPlayerHand()
    
    firstPlayerDecision()
}

function firstPlayerDecision() {   
    clearButtons()
    trackTurn() 
    playerText.innerHTML = `Pass controls to Player ${returnCurrentPlayer()}<br>Player ${returnCurrentPlayer()}... Truth? Or BS?`;
    document.getElementById("buttons").appendChild(truthButton);
    document.getElementById("buttons").appendChild(falseButton);
    truthButton.addEventListener('click', secondPlayerDecision)
    falseButton.addEventListener('click', checkForBullshit)
    console.log('turn is now: ' + turn)
    console.log('card rank is: ' + cardRank)
}

function secondPlayerDecision() {
    clearButtons()
    trackTurn()
    playerText.innerHTML = `Pass controls to Player ${returnCurrentPlayer()}<br>Player ${returnCurrentPlayer()}... Truth? Or BS?`;
    document.getElementById("buttons").appendChild(truthButton);
    document.getElementById("buttons").appendChild(falseButton);
    truthButton.addEventListener('click', thirdPlayerDecision)
    falseButton.addEventListener('click', checkForBullshit)
    console.log('turn is now: ' + turn)
    console.log('card rank is: ' + cardRank)
}

function thirdPlayerDecision() {
    clearButtons()
    trackTurn()
    playerText.innerHTML = `Pass controls to Player ${returnCurrentPlayer()}<br>Player ${returnCurrentPlayer()}... Truth? Or BS?`;
    document.getElementById("buttons").appendChild(truthButton);
    document.getElementById("buttons").appendChild(falseButton);
    truthButton.addEventListener('click', nextRound)
    falseButton.addEventListener('click', checkForBullshit)
    console.log('turn is now: ' + turn)
    console.log('card rank is: ' + cardRank)
}

function returnCurrentPlayer() {
    if (turn === 0) {
        return playerOne.number
    }
    else if (turn === 1) {
        return playerTwo.number
    }
    else if (turn === 2) {
        return playerThree.number
    }
    else if (turn === 3) {
        return playerFour.number
    }
}

function checkForBullshit() {

}