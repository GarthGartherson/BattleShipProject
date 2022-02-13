import "./style.css";
import gameBoardFactory from "./testSuite/boardFactory";
import regeneratorRuntime from "regenerator-runtime";

import "./testSuite/shipArray.js";
import shipArray from "./testSuite/shipArray.js";
const playerGameBoard = document.querySelector(".player-board");
const computerGameBoard = document.querySelector(".computer-board");

// Ship Size Selectors
const defaultCarrier = document.querySelector(".defaultCarrier");
const defaultBattleship = document.querySelector(".defaultBattleship");
const defaultSubmarine = document.querySelector(".defaultSubmarine");
const defaultDestroyer = document.querySelector(".defaultDestroyer");
const defaultPatrolboat = document.querySelector(".defaultPatrolboat");

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
    draggable.addEventListener("dragstart", (e) => {
      draggable.classList.add("dragging");
      let targetShip =
        e.target.classList[1].split("")[0].toUpperCase() +
        e.target.classList[1].slice(1);
      let variableName = `default${targetShip}`;
      let foundElement = document.querySelector(`.${variableName}`);
      e.target.style.height = `${foundElement.clientHeight}px`;
    });

    draggable.addEventListener("dragend", (e) => {
      e.target.style.height = "100%";
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
    console.log(e.target);
    try {
      let ship = shipArray.find(
        (ship) => ship.name === e.target.firstChild.dataset.shipName
      );
      if (e.target.firstChild) {
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
        console.log(e.target.firstChild.classList);
        e.target.firstChild.style.backgroundColor = "red";
        e.target.firstChild.draggable = true;
      }
    }
    console.log(playerGameBoardObject.grid);
  });

  console.log("done");
}

initializeApp();
