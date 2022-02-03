const sunk = (ship) => {
  if (ship.spaces.every((el) => el === "x")) {
    ship.isSunk = true;
    return ship.isSunk;
  }
  return ship.isSunk;
};

module.exports = sunk;
