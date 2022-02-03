const hitShip = require("./hitShip");
const sunk = require("./sunk");

const shipFactoryFunction = function makeShip(name, length) {
  return {
    name: name.toLowerCase(),
    length,
    spaces: Array(length).fill("o"),
    hitShip,
    sunk,
    isSunk: false,
  };
};
module.exports = shipFactoryFunction;
