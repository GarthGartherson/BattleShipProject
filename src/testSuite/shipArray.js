const shipFactoryFunction = require("./shipFactoryFunction");

const ship1 = shipFactoryFunction("carrier", 5);
const ship2 = shipFactoryFunction("battleship", 4);
const ship3 = shipFactoryFunction("destroyer", 3);
const ship4 = shipFactoryFunction("submarine", 3);
const ship5 = shipFactoryFunction("patrolboat", 2);

const shipArray = [ship1, ship2, ship3, ship4, ship5];

module.exports = shipArray;
