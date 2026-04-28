console.log("Memory Game start");

/**
 * Fetches CSV file and returns its content as text.
 * @param {string} file - Path to CSV file
 * @returns {Promise<string>} CSV content as string
 */

async function getData(file) {
  let response = await fetch(file);
  let csvText = await response.text();
  return csvText;
}

/**
 * Converts CSV text into an array of objects.
 * Uses the first row as headers for object keys.
 * @param {string} csv
 * @returns {Array<Object>}
 */

function parseCSV(csv){
  let lines = csv.split('\r\n');
  let header = lines.shift().split(',');
  let allWords = [];
  for(let i = 0; i < lines.length; i++){
    let line = lines[i].split(',');
    let word ={
      "id" : line[0],
      "country" : line[1],
      "capital" : line[2]
    };
    allWords.push(word);
  }
  return allWords;
}

/**
 * Randomly shuffles items in an array
 * using Fisher-Yates algorithm
 * @param {Array} data
 * @returns {Array}
 */
function shuffleItems(data){
   for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
  return data;
}

/**
 * Selects 8 random unique items from an array.
 * @param {Array} data
 * @returns {Array}
 */
function selectItems(data){
  return data.slice(0, 8);
}

/**
 * Creates game card data from selected items.
 * Transforms data into pairs used in the memory game.
 * @param {Array<Object>} data
 * @returns {Array}
 */
function createGameCards(data){
  let gameCards = [];
  for(let i = 0; i < data.length; i++){
    gameCards.push(data[i].country);
    gameCards.push(data[i].capital);
  }
  return gameCards;
}

/**
 * Creates card elements and appends them to the game board.
 * Each card is built with front and back sides using provided data.
 * @param {Array} cards - Array of values used to populate card backs
 */
function renderCards(cards){
  let board = document.getElementById('game-board');
  let numberOfElements = cards.length;

  for (let i = 0; i < numberOfElements; i++){
    let card = document.createElement('div');
    card.className = 'card';
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
      });
    let cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    let cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    let cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = cards[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    board.appendChild(card);
  }
}


let cardData = getData('capitals.csv')
.then(csv => parseCSV(csv))
.then(lines => shuffleItems(lines))
.then(items => selectItems(items))
.then(words => createGameCards(words))
.then(cards => shuffleItems(cards))
.then(result => renderCards(result))


console.log("Board ready");