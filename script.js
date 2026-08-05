import {getData, parseCSV, shuffleItems, selectItems, createGameCards} from './js/gameSetup.js'
import { matchPairs} from './js/gameState.js';

/**
 * Creates card elements and appends them to the game board.
 * Each card is built with front and back sides using provided data.
 * @param {Array<Object>} cards - Array of values used to populate card backs
 */
export function renderCards(cards, board = document.getElementById("game-board")){

  if (!board) {
        throw new Error("renderCards: container #game-board not found");
    }
    
  let numberOfElements = cards.length;

  for (let i = 0; i < numberOfElements; i++){
    let card = document.createElement('div');
    card.className = 'card';
    card.dataset.pairId = cards[i].pairID;
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
      });
    let cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    let cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    let cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = cards[i].element;
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    board.appendChild(card);
  }
}


/**
 * Resets the currently selected cards.
 * Clears references to the first and second selected card.
 */
export function resetSelectedCards(){
    firstCard = null;
    secondCard = null;
}

/**
 * Checks whether the game board is currently blocked.
 * @returns {boolean} True if the board is disabled, otherwise false.
 */
export function isBoardBlocked(){
  let board = document.getElementById('game-board');
  return board.classList.contains("disabled");
}

/**
 * Disables the game board by adding a CSS class.
 * Prevents further user interactions (clicks) on cards.
 */
function blockBoard(){
  let board = document.getElementById('game-board');
  board.classList.add("disabled");
}

/**
 * Enables the game board by removing the disabled CSS class.
 * Restores user interactions with the cards.
 */
function unblockBoard(){
  let board = document.getElementById('game-board');
  board.classList.remove("disabled");
}

/**
 * Initializes game interactions by attaching click event listeners to all cards.
 * Handles user clicks and updates game state (first and second selected cards).
 * Should be called after cards are rendered in the DOM.
 */
function init(){
  let elements = document.getElementsByClassName("card");
  let movesDisplay = document.getElementById("moves");
  
  function incrementMoves(){
    movesCounter++;
    movesDisplay.innerText = movesCounter;
  }

  for(let i = 0; i < elements.length; i++){
    elements[i].onclick = function(eventObj){
      chosen = eventObj.target.closest('.card');
      if(!isBoardBlocked()){
        chosen.classList.add("flipped");
        if(firstCard == null){
          firstCard = chosen;
        }
        else if(chosen != firstCard){
          secondCard = chosen;
          incrementMoves();
          blockBoard();
          let firstId = firstCard.dataset.pairId;
          let secondId = secondCard.dataset.pairId;
          let isPair = matchPairs(firstId, secondId);
          if(isPair){
            handleMatch();
          } 
          else{
            handleMismatch();
          }
        }
      }
    };
  }
}


/**
 * Handles a successful card match.
 * Marks selected cards as matched, updates the matched pairs counter,
 * resets selected cards, and unlocks the board.
 */
function handleMatch(){
    let matchDelay = 1000;
    setTimeout(function(){
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetSelectedCards();
        unblockBoard();
        }, matchDelay);
}


/**
 * Handles a failed card match.
 * Shows mismatch feedback, flips selected cards back after a short delay,
 * resets selected cards, and unlocks the board.
 */
function handleMismatch(){
    let shakeStartDelay = 100;
    let shakeDuration = 400;
    let flipBackDelay = 1000;
    setTimeout(function(){
        firstCard.classList.add("wrong");
        secondCard.classList.add("wrong");
        }, shakeStartDelay);
    setTimeout(function(){
        firstCard.classList.remove("wrong");
        secondCard.classList.remove("wrong");
        }, shakeDuration);
    setTimeout(function(){
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetSelectedCards();
        unblockBoard();
        }, flipBackDelay);
}

/**
 * Starts a new game round.
 * Loads card data, prepares game cards, renders them on the board,
 * and initializes card interactions.
 */
function startGame(){
    getData('./data/capitals.csv')
    .then(csv => parseCSV(csv))
    .then(lines => shuffleItems(lines))
    .then(items => selectItems(items, 8))
    .then(words => createGameCards(words))
    .then(cards => shuffleItems(cards))
    .then(result => {
        renderCards(result)
        init()
    })
}

/**
 * Removes all card elements from the game board.
 * Used before starting a new game or restarting the current one.
 */
function cleanBoard(){
    let board = document.getElementById('game-board');
    while(board.hasChildNodes()){
        board.removeChild(board.firstChild);
    }
}


let chosen = null;
let firstCard = null;
let secondCard = null;
let movesCounter = 0;


export function initializeApp(){
    let resetButton = document.getElementById("restart");
    resetButton.onclick = function(){
    movesCounter = 0;
    document.getElementById("moves").innerText = movesCounter;
    chosen = null;
    firstCard = null;
    secondCard = null;
    cleanBoard();
    startGame();
  }
  startGame();
}








