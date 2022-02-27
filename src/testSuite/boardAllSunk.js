const { shipArray, computerShipArray } = require("./shipArray");

const boardAllSunk = () => {
  return shipArray.every((obj) => obj.isSunk === true);
};

module.exports = boardAllSunk;
