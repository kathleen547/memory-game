/**
 * @jest-environment jsdom
 */

import {renderCards} from '../script.js';


describe('renderCards', () => {
    const data = [
        {element: "Spain", pairID: 0},
        {element: "Madrid", pairID: 0}
    ];

    const setupBoard = () => {
        document.body.innerHTML = `<div id="game-board" class="board"></div>`;
        return document.getElementById('game-board');
    };
    let board;

    beforeEach(() => {
        board = setupBoard();
    });

    afterEach(() => {
        document.body.innerHTML = ''; // no leftovers for the next test
    });

    test('board exists before rendering', () => {
        expect(board).not.toBeNull();
        expect(board.children).toHaveLength(0);
    });

    test("should render correct number of cards", () => {
        renderCards(data, board);
        expect(document.querySelectorAll('.card')).toHaveLength(data.length);
    });

    test("should return correct text from cards", () => {
        renderCards(data, board);
        const cards = document.querySelectorAll(".card");

        expect(cards[0].textContent).toBe("Spain");
        expect(cards[1].textContent).toBe("Madrid");
    });

    test("should return correct pairID", () => {
        renderCards(data, board);
        const cards = document.querySelectorAll(".card");
        expect(cards[0].dataset.pairId).toEqual("0");
        expect(cards[1].dataset.pairId).toEqual("0");
    });

    test("should flip a card on click", () => {
        renderCards(data, board);
        const [first] = document.querySelectorAll('.card');

        first.click();
        expect(first.classList.contains('flipped')).toBe(true);

        first.click();
        expect(first.classList.contains('flipped')).toBe(false);
    });
});