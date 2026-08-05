/**
 * @jest-environment jsdom
 */

import {init, renderCards, resetGameState} from '../script.js';
import {jest} from '@jest/globals'



describe('init', () => {
    const CARDS = [
        {element: "France", pairID: 0},
        {element: "Paris", pairID: 0}
    ];

    const UNMATCHED_CARDS = [
        {element: "Italy", pairID: 1},
        {element: "Paris", pairID: 0}
    ];

    const setupGame = () => {
        document.body.innerHTML = `<div class="stats">
            Moves: <span id="moves">0</span>
        </div>
        <div id="game-board"></div>`;
    };


    let board;
    let movesDisplay;

    beforeEach(() => {
        setupGame();
        board = document.getElementById("game-board");
        movesDisplay = document.getElementById("moves");
        resetGameState();
    });


    test('should flip the card after first click', () => {
        renderCards(CARDS, board);
        init();
        const chosen = board.querySelector(".card");
        chosen.click();
        expect(chosen.classList.contains('flipped')).toBe(true);
        expect(movesDisplay.textContent).toBe("0");
    });

    test('should increase move counter after second card click', () => {
        renderCards(CARDS, board);
        init();
        const [firstCardElement, secondCardElement] = board.querySelectorAll(".card");
        expect(firstCardElement).not.toBe(secondCardElement); 
        firstCardElement.click();
        expect(firstCardElement.classList.contains('flipped')).toBe(true);   
        secondCardElement.click();    
        expect(secondCardElement.classList.contains('flipped')).toBe(true);
        expect(movesDisplay.textContent).toBe("1");
    });

    test('should mark matching cards as matched', () => {
        jest.useFakeTimers();
        renderCards(CARDS, board);
        init();
        const cards = board.querySelectorAll(".card");
        expect(cards).toHaveLength(2);
        const [firstCardElement, secondCardElement] = cards;
        expect(firstCardElement).not.toBe(secondCardElement); 
        firstCardElement.click();
        secondCardElement.click();
        jest.advanceTimersByTime(1000);
        expect(firstCardElement.classList.contains('matched')).toBe(true);
        expect(secondCardElement.classList.contains('matched')).toBe(true);
        jest.useRealTimers();
    });

    test('should flip unmatched card back', () => {
        jest.useFakeTimers();
        renderCards(UNMATCHED_CARDS, board);
        init();
        const cards = board.querySelectorAll(".card");
        const [firstCardElement, secondCardElement] = cards;
        expect(firstCardElement).not.toBe(secondCardElement); 
        firstCardElement.click();
        secondCardElement.click();
        jest.advanceTimersByTime(1500);
        expect(firstCardElement.classList.contains('flipped')).toBe(false);
        expect(secondCardElement.classList.contains('flipped')).toBe(false);
        jest.useRealTimers();
    });
});