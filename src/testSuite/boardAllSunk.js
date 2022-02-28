const { shipArray, computerShipArray } = require("./shipArray");

const boardAllSunk = (array) => {
  return array.every((obj) => obj.isSunk === true);
};

module.exports = boardAllSunk;
