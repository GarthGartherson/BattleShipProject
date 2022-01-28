const createShips = require("./createShips");
const shipFactoryFunction = require("./createFactory");

test("Create Carrier Ship (5 length)", () => {
  expect(shipFactoryFunction("Carrier", 5)).toEqual({
    name: "Carrier",
    length: 5,
    spaces: ["o", "o", "o", "o", "o"],
    sunk: false,
  });
});

test("Test to see correct ship spaces", () => {
  expect(shipFactoryFunction("Carrier", 5).spaces).toEqual([
    "o",
    "o",
    "o",
    "o",
    "o",
  ]);
});

test("Test to see correct ship spaces", () => {
  expect(shipFactoryFunction("Carrier", 5).spaces).toEqual([
    "o",
    "o",
    "o",
    "o",
    "o",
  ]);
});

// Previous tests b4 factory function

// test("Create 5 Ships", () => {
//   expect(createShips().length).toBe(5);
// });

// test("First Ship Name is 'Carrier'", () => {
//   expect(createShips()[0].name).toBe("Carrier");
// });

// test("Second Ship Name is 'Battleship'", () => {
//   expect(createShips()[1].name).toBe("Battleship");
// });

// test("Third Ship Name is = 'Cruiser'", () => {
//   expect(createShips()[2].name).toBe("Cruiser");
// });

// test("Fourth Ship Name is 'Submarine'", () => {
//   expect(createShips()[3].name).toBe("Submarine");
// });

// test("Fifth Ship Name is 'Patrol Boat'", () => {
//   expect(createShips()[4].name).toBe("Patrol Boat");
// });

// test("Test Ship Spaces on Ship 5", () => {
//   expect(createShips()[4].spaces).toEqual(["o", "o"]);
// });

// test("Test Ship Spaces on Ship 1", () => {
//   expect(createShips()[0].spaces).toEqual(["o", "o", "o", "o", "o"]);
// });

// test();
// test();
// test();
// test();
