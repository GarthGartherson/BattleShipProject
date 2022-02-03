const hitShip = require("./hitShip");

const receiveAttack = (gameboard, shipArray, tile) => {
  if (gameboard.grid[tile] === "m" || gameboard.grid[tile] === "h") {
    return;
  } else if (gameboard.grid[tile] === "w") {
    gameboard.grid[tile] = "m";
  } else {
    for (boat of shipArray) {
      if (boat.name == gameboard.grid[tile]) {
        hitShip(boat);
      }
    }
    // Create Ship Aray to Loop through checking for match..... could do constant lookup in objecT?
    //needs to find ship and put that through the function to mark as hit..... somewhere?
    gameboard.grid[tile] = "h";
  }
};

module.exports = receiveAttack;
