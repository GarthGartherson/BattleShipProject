const shipFactoryFunction = function makeShip(name, length) {
  return {
    name,
    length,
    spaces: Array(length).fill("o"),
    sunk: false,
  };
};
module.exports = shipFactoryFunction;
