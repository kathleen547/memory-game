import { matchPairs } from "../js/gameState";

test('should return true for matching pair IDs', () => {
    expect(matchPairs(0, 0)).toBeTruthy();
});


test('should return false for different pair IDs', () => {
    expect(matchPairs(0, 1)).toBeFalsy();
});