const gameBoardFactory = require("./boardFactory");
const shipArray = require("./shipArray");

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
  currentBoard.placeShip(shipArray[4], desiredAxis, 0);
  expect(currentBoard.grid[0]).toEqual("patrol boat");
  expect(currentBoard.grid[3]).toEqual("patrol boat");
});

test("GameBoard to Generate 2 space Ship Horizontally on 3x3 grid", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Horizontal";
  currentBoard.placeShip(shipArray[4], desiredAxis, 0);
  expect(currentBoard.grid[0]).toEqual("patrol boat");
  expect(currentBoard.grid[1]).toEqual("patrol boat");
  expect(currentBoard.grid[2]).toEqual("w");
});

test("Testing overextending boundaries horizontally! Ship length 2 board size 3x3", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Horizontal";
  expect(() => currentBoard.placeShip(shipArray[4], desiredAxis, 2)).toThrow(
    Error
  );
});

test("Testing overextending boundaries Vertically! Ship length 2 board size 3x3", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Horizontal";
  expect(() => currentBoard.placeShip(shipArray[4], desiredAxis, 2)).toThrow(
    Error
  );
});

test("GameBoard to Generate 2 space Ship Horizontally on 10x10 grid", () => {
  const currentBoard = gameBoardFactory(10);

  let desiredAxis = "Horizontal";
  currentBoard.placeShip(shipArray[4], desiredAxis, 4);
  expect(currentBoard.grid[4]).toEqual("patrol boat");
  expect(currentBoard.grid[5]).toEqual("patrol boat");
});

test("Test Basic Hit Detection for places with ships and misses w/ 2 space ship", () => {
  const currentBoard = gameBoardFactory(3);

  let desiredAxis = "Horizontal";
  currentBoard.placeShip(shipArray[4], desiredAxis, 0);
  currentBoard.receiveAttack(currentBoard, shipArray, 0);
  currentBoard.receiveAttack(currentBoard, shipArray, 2);
  currentBoard.receiveAttack(currentBoard, shipArray, 1);
  expect(currentBoard.grid[0]).toEqual("h");
  expect(currentBoard.grid[1]).toEqual("h");
  expect(currentBoard.grid[2]).toEqual("m");
});

test("Test Basic Hit Detection for places with a 3 space ship", () => {
  const currentBoard = gameBoardFactory(3);
  let desiredAxis = "Horizontal";
  currentBoard.placeShip(shipArray[3], desiredAxis, 0);
  currentBoard.receiveAttack(currentBoard, shipArray, 0);
  currentBoard.receiveAttack(currentBoard, shipArray, 1);
  currentBoard.receiveAttack(currentBoard, shipArray, 2);
  expect(currentBoard.grid[0]).toEqual("h");
  expect(currentBoard.grid[1]).toEqual("h");
  expect(currentBoard.grid[2]).toEqual("h");
});
