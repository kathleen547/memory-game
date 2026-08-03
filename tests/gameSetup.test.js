
import { parseCSV } from "../js/gameSetup.js";

const inputOneRecord =
`id,country,capital
1,Poland,Warsaw`;


test('should return one parsed object', () => {
    expect(parseCSV(inputOneRecord).length).toBe(1);
});

test('should parse country correctly', () => {
    expect(parseCSV(inputOneRecord)[0]["country"]).toBe("Poland");
});

test('should parse capital correctly', () => {
    expect(parseCSV(inputOneRecord)[0]["capital"]).toBe("Warsaw");
});

test('should parse id correctly', () => {
    expect(parseCSV(inputOneRecord)[0]["id"]).toBe("1");
});

const inputTwoRecords =
`id,country,capital
1,France,Paris
2,Italy,Rome`;

test('should return second country correctly', () => {
    expect(parseCSV(inputTwoRecords)[1]["country"]).toBe("Italy");
});

test('should return second capital correctly', () => {
    expect(parseCSV(inputTwoRecords)[1]["capital"]).toBe("Rome");
});



