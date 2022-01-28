const gameGrid = (num) => {
  let gameBoard = [];
  for (let row = 0; row < num; row++) {
    for (let column = 0; column < num; column++) {
      let newSpace = [];
      newSpace.push(row, column);
      gameBoard.push(newSpace);
    }
  }
  return gameBoard;
};

const gameBoardFactory = function makeBoard(num) {
  return {
    grid: gameGrid(num),
    num,
  };
};

module.exports = gameBoardFactory;
