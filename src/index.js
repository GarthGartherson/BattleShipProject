import "./style.css";
import gameBoardFactory from "./testSuite/boardFactory";
import regeneratorRuntime from "regenerator-runtime";

import "./testSuite/shipArray.js";
import shipArray from "./testSuite/shipArray.js";
const playerGameBoard = document.querySelector(".player-board");
const computerGameBoard = document.querySelector(".computer-board");

const playerGameBoardObject = gameBoardFactory(10);

async function initializeApp() {
  for (let i = 0; i < playerGameBoardObject.grid.length; i++) {
    let gridBox = document.createElement("div");
    gridBox.style.width = "10%";
    gridBox.style.height = "10%";
    gridBox.style.backgroundColor = "purple";
    gridBox.style.border = "solid black 1px";
    gridBox.dataset.boxNumber = i;
    playerGameBoard.appendChild(gridBox);
  }

  await document.addEventListener("click", (e) => {
    playerGameBoardObject.placeShip(
      shipArray[0],
      "Vertical",
      Number(e.target.dataset.boxNumber)
    );
    console.log(playerGameBoardObject.grid);
  });

  await document.addEventListener("click", (e) => {
    playerGameBoardObject.placeShip(
      shipArray[0],
      "Horizontal",
      Number(e.target.dataset.boxNumber)
    );
    console.log(playerGameBoardObject.grid);
  });

  console.log("done");
}

initializeApp();

// gridBox.addEventListener("mouseenter", () => {
//   gridBox.style.backgroundColor = "red";
// });

// function generateGrid(boxes = 16){
//   let width = 960/boxes;
//   let height = 960/boxes;
//   console.log(height, width)
//   for(let i= 0; i < boxes; i++){
//       let row = document.createElement('div')
//       for(let j=0; j< boxes; j++){
//           let gridBox = document.createElement('div')
//           gridBox.style.width = `${width}px`;
//           gridBox.style.height = `${height}px`;
//           gridBox.style.backgroundColor = 'purple';
//           row.appendChild(gridBox)
//           container.appendChild(row)
//           gridBox.addEventListener('mouseenter', () => {
//               gridBox.style.backgroundColor = 'red'
//           })
//       }
//   }
// }
