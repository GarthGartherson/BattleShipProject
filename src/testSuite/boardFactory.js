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

// m = miss, w="water", h = hit,
const gameBoardFactory = function makeBoard(num) {
  return {
    grid: gameGrid(num),
    num,
    placeShip(ship, desiredAxis, placementOrigin) {
      const gridSize = Math.sqrt(this.grid.length);

      if (desiredAxis === "Vertical") {
        if (placementOrigin + ship.length * gridSize <= 100)
          for (let i = 0; i < ship.length; i++) {
            this.grid[placementOrigin + gridSize * i] = ship.name
              .split("")[0]
              .toLowerCase();
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
            this.grid[placementOrigin + i] = ship.name
              .split("")[0]
              .toLowerCase();
          }
        } else {
          throw Error("Extended Past the Grid Horizontally!");
        }
      }
    },
    receiveAttack(tile) {
      if (this.grid[tile] === "m" || this.grid[tile] === "h") {
        return;
      } else if (this.grid[tile] === "w") {
        this.grid[tile] = "m";
      } else {
        this.grid[tile] = "h";
      }
    },
  };
};

module.exports = gameBoardFactory;
