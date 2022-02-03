const shipFactoryFunction = require("./shipFactoryFunction");

const ship1 = shipFactoryFunction("Carrier", 5);
const ship2 = shipFactoryFunction("Battleship", 4);
const ship3 = shipFactoryFunction("Destroyer", 3);
const ship4 = shipFactoryFunction("Submarine", 3);
const ship5 = shipFactoryFunction("Patrol Boat", 2);

const shipArray = [ship1, ship2, ship3, ship4, ship5];

module.exports = shipArray;
