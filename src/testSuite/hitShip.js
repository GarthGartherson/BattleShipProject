const hitShip = (ship) => {
  if (ship.spaces.includes("o")) {
    let index = ship.spaces.indexOf("o");
    ship.spaces.splice(index, 1, "x");
    return ship;
    // ship.spaces.splice("index", 1, "x");
    // return ship.spaces;
  }
};

module.exports = hitShip;
