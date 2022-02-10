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
    gridBox.style.width = "10%";
    gridBox.style.height = "10%";
    // gridBox.draggable = false;
    gridBox.style.border = "solid black .5px";
    gridBox.dataset.boxNumber = i;
    gridBox.classList.add("container");
    playerGameBoard.appendChild(gridBox);
  }

  const draggables = document.querySelectorAll(".draggable");
  const containers = document.querySelectorAll(".container");
  console.log(shipArray);
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", (e) => {
      draggable.classList.remove("dragging");
      draggable.classList.remove("invisible");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragstart", () => {
      container.classList.remove("hovered");
    });

    container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const draggable = document.querySelector(".dragging");
      console.log(draggable.draggable);
      if (draggable.draggable === false) {
        return;
      }

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
      e.target.classList.remove("hovered");
    });
  });

  document.addEventListener("drop", (e) => {
    try {
      let ship = shipArray.find(
        (ship) => ship.name === e.target.firstChild.dataset.shipName
      );
      if (e.target.firstChild.classList[1]) {
        e.target.firstChild.style.backgroundColor = "green";
        e.target.firstChild.draggable = false;
        playerGameBoardObject.placeShip(
          ship,
          "Vertical",
          Number(e.target.dataset.boxNumber)
        );
      }
      let nonEmptyBoxes = [];
      for (let [index, box] of playerGameBoardObject.grid.entries()) {
        if (box !== "w") {
          nonEmptyBoxes.push(index);
        }
      }
      for (let boxNumber of nonEmptyBoxes) {
        console.log(boxNumber);
        let element = document.querySelector(
          `[data-box-number="${boxNumber}"]`
        );
        element.style.backgroundColor = "green";
        // playerGameBoardObject.grid[boxNumber].backgroundColor = "green";
      }
    } catch (err) {
      console.log(err);
      if (e.target.firstChild) {
        e.target.firstChild.style.backgroundColor = "red";
        e.target.firstChild.draggable = true;
      }
    }
    console.log(playerGameBoardObject.grid);
  });

  console.log("done");
}

initializeApp();
