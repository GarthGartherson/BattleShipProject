import "./style.css";
import gameBoardFactory from "./testSuite/boardFactory";
import regeneratorRuntime from "regenerator-runtime";

import "./testSuite/shipArray.js";
import shipArray from "./testSuite/shipArray.js";

// buttons
const rotateShipButton = document.querySelector(".button-rotate-ship");
const startGameButton = document.querySelector(".button-start-game");
const resetGameButton = document.querySelector(".button-reset-game");

// Game Boards
const playerGameBoard = document.querySelector(".player-board");
const computerGameBozard = document.querySelector(".computer-board");
const shipContainer = document.querySelector(".ship-container");

// Ship Size Selectors
const defaultCarrier = document.querySelector(".defaultCarrier");
const defaultBattleship = document.querySelector(".defaultBattleship");
const defaultSubmarine = document.querySelector(".defaultSubmarine");
const defaultDestroyer = document.querySelector(".defaultDestroyer");
const defaultPatrolboat = document.querySelector(".defaultPatrolboat");

const playerGameBoardObject = gameBoardFactory(10);
const draggables = document.querySelectorAll(".draggable");
let placementDirection = true;

resetGameButton.addEventListener("click", (e) => {
  playerGameBoardObject.grid.forEach((tile, index) => {
    console.log(tile);
    if (tile !== "w") {
      playerGameBoardObject.grid[index] = "w";
    }
    tile = "w";
  });

  e.preventDefault();
  const playerBoardSpaces = document.querySelectorAll(
    ".player-board > .container"
  );

  playerBoardSpaces.forEach((space) => {
    space.style.backgroundColor = "#d4f1f9";
    console.log(space.hasChildNodes());
    if (space.hasChildNodes === true) {
      const element = space.querySelector(".draggable");
      console.log(element);
      space.remove(element);
      space.style.backgroundColor = "";
    }
  });

  draggables.forEach((draggable) => {
    draggable.draggable = true;

    if (!draggable.closest(".container").classList.contains("default")) {
      draggable.style.backgroundColor = "grey";
      let firstCapitalized =
        "default" +
        draggable.classList[1].split("")[0].toUpperCase() +
        draggable.classList[1].slice(1);
      document.querySelector(`.${firstCapitalized}`).append(draggable);
    }
  });
  // console.log(space.children);

  // board game approach
  // console.log(playerGameBoard.forEach((node) => console.log(node)));
});

rotateShipButton.addEventListener("click", (e) => {
  e.preventDefault();
  placementDirection = !placementDirection;
  console.log(placementDirection);

  if (placementDirection === false) {
    shipContainer.style.flexDirection = "column";
    document.querySelectorAll(".default").forEach((draggable) => {
      draggable.classList.remove("vertical");
      draggable.classList.add("horizontal");
    });
  } else {
    shipContainer.style.flexDirection = "row";
    document.querySelectorAll(".default").forEach((draggable) => {
      draggable.classList.remove("horizontal");
      draggable.classList.add("vertical");
    });
  }
});

function initializeApp() {
  for (let i = 0; i < playerGameBoardObject.grid.length; i++) {
    let gridBox = document.createElement("div");
    gridBox.style.width = "10%";
    gridBox.style.height = "10%";
    gridBox.style.border = "solid black .5px";
    gridBox.dataset.boxNumber = i;
    gridBox.classList.add("container");
    playerGameBoard.appendChild(gridBox);
  }

  const containers = document.querySelectorAll(".container");
  // let placementDirection = true;

  console.log(shipArray);
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      // Add DRagging Class for Eleemnts being Dragged
      draggable.classList.add("dragging");
      let targetShip =
        e.target.classList[1].split("")[0].toUpperCase() +
        e.target.classList[1].slice(1);
      let variableName = `default${targetShip}`;
      let foundElement = document.querySelector(`.${variableName}`);
      if (placementDirection === true) {
        e.target.style.height = `${foundElement.clientHeight}px`;
        e.target.style.width = `100%`;
      }
      if (placementDirection === false) {
        e.target.style.width = `${foundElement.clientWidth}px`;
        e.target.style.height = `100%`;
      }
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
      if (e.target.firstChild) {
        e.target.firstChild.style.backgroundColor = "green";
        e.target.firstChild.draggable = false;

        let desiredAxis =
          placementDirection === true ? "Vertical" : "Horizontal";

        playerGameBoardObject.placeShip(
          ship,
          desiredAxis,
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
        let element = document.querySelector(
          `[data-box-number="${boxNumber}"]`
        );
        element.style.backgroundColor = "green";
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
