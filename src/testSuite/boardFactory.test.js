const gameBoardFactory = require("./boardFactory");
const shipFactoryFunction = require("./createFactory");

let ship = {
  name: "Patrol Boat",
  length: 2,
  spaces: ["o", "o"],
  sunk: false,
};

test("Makes an Object Based on Size", () => {
  expect(gameBoardFactory(1).grid).toEqual(["w"]);
});

test("Make gameboard object and grid with 100 Length", () => {
  expect(gameBoardFactory(10).grid.length).toBe(100);
});

test("100 space board find 45th space", () => {
  expect(gameBoardFactory(10).grid[45]).toEqual("w");
});

test("GameBoard to Generate 2 space Ship Vertically on 3x3 grid", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Vertical";
  currentBoard.placeShip(ship, desiredAxis, 0);
  expect(currentBoard.grid[0]).toEqual("o");
  expect(currentBoard.grid[3]).toEqual("o");
});

test("GameBoard to Generate 2 space Ship Horizontally on 3x3 grid", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Horizontal";
  currentBoard.placeShip(ship, desiredAxis, 0);
  expect(currentBoard.grid[0]).toEqual("o");
  expect(currentBoard.grid[1]).toEqual("o");
  expect(currentBoard.grid[2]).toEqual("w");
});

test("Testing overextending boundaries horizontally! Ship length 2 board size 3x3", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Horizontal";
  //   currentBoard.placeShip(ship, desiredAxis, 2);
  expect(() => currentBoard.placeShip(ship, desiredAxis, 2)).toThrow(Error);
});

test("Testing overextending boundaries Vertically! Ship length 2 board size 3x3", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Horizontal";
  expect(() => currentBoard.placeShip(ship, desiredAxis, 2)).toThrow(Error);
});

test("GameBoard to Generate 2 space Ship Horizontally on 10x10 grid", () => {
  const currentBoard = gameBoardFactory(10);

  let desiredAxis = "Horizontal";
  currentBoard.placeShip(ship, desiredAxis, 4);
  expect(currentBoard.grid[4]).toEqual("o");
  expect(currentBoard.grid[5]).toEqual("o");
});

// test("Place 5 place Ship on 10x10 grid", () => {
//   const currentBoard = gameBoardFactory(10);
//   let desiredAxis = "Vertical";
//   let ship = null;
//   currentBoard.placeShip(ship, desiredAxis, 0);
// });
