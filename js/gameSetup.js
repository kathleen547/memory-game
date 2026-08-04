/**
 * Fetches CSV file and returns its content as text.
 * @param {string} file - Path to CSV file
 * @returns {Promise<string>} CSV content as string
 */

export async function getData(file) {
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

export function parseCSV(csv){
  let lines = csv.trim().split(/\r?\n/);
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
export function shuffleItems(data){
   for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
  return data;
}

/**
 * Selects random unique items from an array.
 * @param {Array} data
 * @returns {Array}
 */
export function selectItems(data, numberOfElements){
  return data.slice(0, numberOfElements);
}


/**
 * Creates game card data from selected items.
 * Transforms data into pairs used in the memory game.
 * @param {Array<Object>} data
 * @returns {Array<Object>}
 */
export function createGameCards(data){
  let gameCards = [];
  for(let i = 0; i < data.length; i++){
    gameCards.push({element: data[i].country, pairID: i});
    gameCards.push({element: data[i].capital, pairID: i});
  }
  return gameCards;
}
