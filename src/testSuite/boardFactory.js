const receiveAttack = require("./receiveAttack");
const boardAllSunk = require("./boardAllSunk");
const shipArray = require("./shipArray");

const gameGrid = (num) => {
  let gameBoard = [];
  for (let row = 0; row < num; row++) {
    for (let column = 0; column < num; column++) {
      //   let newSpace = [];
      //   newSpace.push("w");
      gameBoard.push("w");
    }
  }
  return gameBoard;
};

// m = miss, w="water", h = hit,
const gameBoardFactory = function makeBoard(num) {
  return {
    grid: gameGrid(num),
    num,
    placeShip(ship, desiredAxis, placementOrigin) {
      const gridSize = Math.sqrt(this.grid.length);

      if (desiredAxis === "Vertical") {
        if (placementOrigin + (ship.length - 1) * gridSize < 100)
          for (let i = 0; i < ship.length; i++) {
            this.grid[placementOrigin + gridSize * i] = ship.name.toLowerCase();
          }
        else {
          throw Error("Extended Past the Grid Vertically!");
        }
      } else if ((desiredAxis = "Horizontal")) {
        if (
          placementOrigin + ship.length <=
          Math.ceil((placementOrigin + 1) / 10) * gridSize
        ) {
          for (let i = 0; i < ship.length; i++) {
            this.grid[placementOrigin + i] = ship.name.toLowerCase();
          }
        } else {
          throw Error("Extended Past the Grid Horizontally!");
        }
      }
    },
    receiveAttack,
    boardAllSunk,
  };
};

module.exports = gameBoardFactory;
