const sunk = require("./sunk");

const ship1 = {
  name: "Cruiser",
  length: 3,
  spaces: ["o", "o", "x"],
  sunk,
  isSunk: false,
};

const ship2 = {
  name: "Cruiser",
  length: 3,
  spaces: ["x", "x", "x"],
  sunk,
  isSunk: false,
};

const ship3 = {
  name: "Cruiser",
  length: 3,
  spaces: ["x", "o", "x"],
  sunk,
  isSunk: false,
};

test("Check for false sink", () => {
  expect(ship1.sunk(ship1)).toEqual(false);
});

test("Check and Change if Sunk Ship is Done", () => {
  expect(ship2.sunk(ship2)).toEqual(true);
});

test("Check for false sink 2", () => {
  expect(ship3.sunk(ship3)).toEqual(false);
});
