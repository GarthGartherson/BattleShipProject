const gameBoardFactory = require("./boardFactory");

const gameGrid = (num) => {
  let gameBoard = [];
  for (let row = 0; row < num; row++) {
    for (let column = 0; column < num; column++) {
      let newSpace = [];
      newSpace.push(row, column);
      gameBoard.push(newSpace);
    }
  }
  return gameBoard;
};

test("Makes an Object Based on Size", () => {
  expect(gameBoardFactory(1).grid).toEqual([[0, 0]]);
});

test("Make gameboard object and grid with 100 Length", () => {
  expect(gameBoardFactory(10).grid.length).toBe(100);
});

test("100 space board find 45th space", () => {
  expect(gameBoardFactory(10).grid[45]).toEqual([4, 5]);
});
