import "./style.css";
import gameBoardFactory from "./testSuite/boardFactory";
import regeneratorRuntime from "regenerator-runtime";

import "./testSuite/shipArray.js";
import shipArray from "./testSuite/shipArray.js";
const playerGameBoard = document.querySelector(".player-board");
const computerGameBoard = document.querySelector(".computer-board");

const playerGameBoardObject = gameBoardFactory(10);

function initializeApp() {
  for (let i = 0; i < playerGameBoardObject.grid.length; i++) {
    let gridBox = document.createElement("div");
    gridBox.style.width = "calc(10% -2px)";
    gridBox.style.height = "calc(10% - 2px)";
    gridBox.draggable = false;
    console.log(gridBox.style.width);
    // gridBox.style.backgroundColor = "purple";
    gridBox.style.border = "solid black 1px";
    gridBox.dataset.boxNumber = i;
    gridBox.classList.add("container");
    playerGameBoard.appendChild(gridBox);
  }

  document.addEventListener("drop", (e) => {
    try {
      if (e.target.firstChild) {
        e.target.firstChild.style.backgroundColor = "green";
        e.target.firstChild.draggable = false;
        playerGameBoardObject.placeShip(
          shipArray[0],
          "Vertical",
          Number(e.target.dataset.boxNumber)
        );
      }
    } catch (err) {
      if (e.target.firstChild) {
        e.target.firstChild.style.backgroundColor = "red";
        e.target.firstChild.draggable = true;
      }
      console.log("errors");
    }
    console.log(playerGameBoardObject.grid);
  });

  const draggables = document.querySelectorAll(".draggable");
  const containers = document.querySelectorAll(".container");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
      draggable.classList.remove("invisible");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const draggable = document.querySelector(".dragging");
      if (draggable) {
        e.target.classList.add("hovered");
      }
      if (draggable && draggable.draggable === true) {
        container.appendChild(draggable);
        setTimeout(() => {
          draggable.classList.add("invisible");
        }, 0);
      }
    });

    container.addEventListener("dragleave", (e) => {
      document.querySelector(".dragging");
      e.target.classList.remove("hovered");
    });
  });

  console.log("done");
}

initializeApp();
