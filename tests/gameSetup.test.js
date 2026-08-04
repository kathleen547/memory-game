
import { parseCSV, shuffleItems, selectItems, createGameCards} from "../js/gameSetup.js";

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


const inputItems = [
    { id: 1, country: "Poland", capital: "Warsaw" },
    { id: 2, country: "Germany", capital: "Berlin" },
    { id: 3, country: "France", capital: "Paris" },
    { id: 4, country: "Italy", capital: "Rome" },
    { id: 5, country: "Spain", capital: "Madrid" }
];

test('should return correct array length', () => {
    expect(shuffleItems([...inputItems]).length).toBe(inputItems.length);
});


test('should contain all original elements', () => {
    expect(shuffleItems([...inputItems])).toEqual(expect.arrayContaining(inputItems));
});


const expectedOutput = [
    { id: 1, country: "Poland", capital: "Warsaw" },
    { id: 2, country: "Germany", capital: "Berlin" }
];

test('should contain first two elements', () => {
    expect(selectItems([...inputItems], 2)).toEqual(expectedOutput);
});

test('should return correct array length', () => {
    expect(selectItems([...inputItems], 3).length).toBe(3);
});

test('should return whole input array', () => {
    expect(selectItems([...inputItems], 10)).toEqual(inputItems);
});

test('should not modify the original array', () => {
    const original = [...inputItems];
    selectItems(inputItems, 2);

    expect(inputItems).toEqual(original);
});

test('should return doubled array length', () => {
    expect(createGameCards([...inputItems]).length).toBe(10);
});


const expectedOutputCountry = {
    element: "Poland", pairID: 0
}

test('should return correct card with country and pairID', () => {
    expect(createGameCards([...inputItems])[0]).toEqual(expectedOutputCountry);
});

const expectedOutputCapital = {
    element: "Warsaw", pairID: 0
}

test('should return correct card with capital and pairID', () => {
    expect(createGameCards([...inputItems])[1]).toEqual(expectedOutputCapital);
});

const expectedSecondCountry = {
    element: "Germany", pairID: 1
}

const expectedSecondCapital = {
    element: "Berlin", pairID: 1
}

test('should assign consecutive pair IDs', () => {
    expect(createGameCards([...inputItems])[2]).toEqual(expectedSecondCountry);
    expect(createGameCards([...inputItems])[3]).toEqual(expectedSecondCapital);
});

test('should not modify original input', () => {
    const original = [...inputItems];
    createGameCards([...inputItems]);

    expect(inputItems).toEqual(original);
});





