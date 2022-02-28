const hitship = require("./hitShip");
const sunk = require("./sunk");

const ship1 = {
  name: "Cruiser",
  length: 3,
  spaces: ["o", "o", "x"],
  hitship,
  sunk,
  isSunk: false,
};

const ship2 = {
  name: "Cruiser",
  length: 3,
  spaces: ["x", "x", "x"],
  hitship,
  sunk,
  isSunk: false,
};

const ship3 = {
  name: "Cruiser",
  length: 3,
  spaces: ["x", "o", "x"],
  hitship,
  sunk,
  isSunk: false,
};

test("Hit Ship With Internal Function", () => {
  expect(hitship(ship1).spaces).toEqual(["x", "o", "x"]);
});

test("Check for false sink", () => {
  expect(ship1.sunk(ship1)).toEqual(false);
});

test("Check and Change if Sunk Ship is Done", () => {
  expect(ship2.sunk(ship2)).toEqual(true);
});

test("Check for false sink 2", () => {
  expect(ship3.sunk(ship3)).toEqual(false);
});
