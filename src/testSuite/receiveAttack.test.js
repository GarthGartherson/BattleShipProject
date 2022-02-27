const gameBoardFactory = require("./boardFactory");
const shipFactoryFunction = require("./shipFactoryFunction");
const { shipArray } = require("./shipArray");

// const ship1 = shipFactoryFunction("Alpha", 5);
// const ship2 = shipFactoryFunction("Beta", 5);
// const ship3 = shipFactoryFunction("Gamma", 3);

// const shipArray = { ship1, ship2, ship3 };

test("Receives Hit on Ship 'Alpha' on Square 1", () => {
  const currentBoard = gameBoardFactory(10);
  currentBoard.placeShip(shipArray[0], "Vertical", 0);
  currentBoard.receiveAttack(currentBoard, shipArray, 0);
  expect(currentBoard.grid[0]).toEqual("h");
});
