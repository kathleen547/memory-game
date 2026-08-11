# Memory Game

A simple browser-based memory matching game built with vanilla JavaScript, HTML, and CSS.

Flip cards, find matching pairs, and try to complete the game in as few moves as possible.

## Preview
![Game preview](assets/screenshot1.png)

## Features

- Card matching logic
- Move counter
- Restart functionality
- Smooth card flip animation
- Mismatch feedback animation
- Responsive grid layout

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, animations)
- JavaScript
- Jest
- Playwright

## Testing

The project includes automated tests covering game logic and user interactions:

- Unit tests with Jest for core game logic, including CSV parsing, shuffling, item        selection, and card creation.
- Integration tests with Jest and jsdom for DOM rendering and game interactions.
- End-to-end tests with Playwright covering core user flows across Chromium, Firefox, and WebKit.


## How to Run

1. Clone the repository:
   git clone https://github.com/kathleen547/memory-game.git

2. Open index.html in your browser

### Run tests

1. Jest:  
`npm test`

2. Playwright:
`npx playwright test`

## Project Structure

- index.html – main HTML structure
- styles.css – styling and animations
- script.js – game logic
- capitals.csv – data source
- assets/ – images and icons


## What I Learned

- Managing application state in JavaScript
- Working with DOM events and dynamic elements
- Handling asynchronous operations (fetch, promises)
- Structuring code into reusable functions
- Implementing UI animations with CSS
- Writing unit, integration, and end-to-end tests using Jest, jsdom, and Playwright.

## Future Improvements

- Add timer
- Add high score system
- Improve mobile responsiveness