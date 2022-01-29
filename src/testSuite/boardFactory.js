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

const ship = {
  name: "Patrol Boat",
  length: 2,
  spaces: ["o", "o"],
  sunk: false,
};

const gameBoardFactory = function makeBoard(num) {
  return {
    grid: gameGrid(num),
    num,
    placeShip(ship, desiredAxis, placementOrigin) {
      const gridSize = Math.sqrt(this.grid.length);

      if (desiredAxis === "Vertical") {
        if (placementOrigin + ship.length * gridSize < 100)
          for (let i = 0; i < ship.length; i++) {
            this.grid[placementOrigin + gridSize * i] = "o";
          }
        else {
          throw Error("Extended Past the Grid Vertically!");
        }
      } else if ((desiredAxis = "Horizontal")) {
        if (
          placementOrigin + ship.length <
          Math.ceil((placementOrigin + 1) / 10) * gridSize
        ) {
          for (let i = 0; i < ship.length; i++) {
            this.grid[placementOrigin + i] = "o";
          }
        } else {
          throw Error("Extended Past the Grid Horizontally!");
        }
      }
    },
  };
};

module.exports = gameBoardFactory;
