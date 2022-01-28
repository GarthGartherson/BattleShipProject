const shipsArray = () => {
  return [
    {
      name: "Carrier",
      length: 5,
      spaces: ["o", "o", "o", "o", "o"],
      sunk: false,
    },
    {
      name: "Battleship",
      length: 4,
      spaces: ["o", "o", "o", "o"],
      sunk: false,
    },
    {
      name: "Cruiser",
      length: 3,
      spaces: ["o", "o", "o"],
      sunk: false,
    },
    {
      name: "Submarine",
      length: 3,
      spaces: ["o", "o", "o"],
      sunk: false,
    },
    {
      name: "Patrol Boat",
      length: 2,
      spaces: ["o", "o"],
      sunk: false,
    },
  ];
};

// const createSpaces = (ship) => {
//     for(i = 0; i < ship.length; i++){
//         let array = []
//         ship.spaces = 'o'
//     }
// }

// const hitSpace = (ship) => {
//   if (ship.spaces.includes("o")) {
//     ship.spaces.replace("o", "x");
//     return ship.spaces;
//   } else {
//     ship.sunk = true;
//     return ship.spaces;
//   }
// };

module.exports = shipsArray;
// module.exports = hitSpace;
