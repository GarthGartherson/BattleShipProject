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
const computerGameBoard = document.querySelector(".computer-board");
const shipContainer = document.querySelector(".ship-container");
const placementBoard = document.querySelector(".placement-board");

// Ship Size Selectors
const defaultCarrier = document.querySelector(".defaultCarrier");
const defaultBattleship = document.querySelector(".defaultBattleship");
const defaultSubmarine = document.querySelector(".defaultSubmarine");
const defaultDestroyer = document.querySelector(".defaultDestroyer");
const defaultPatrolboat = document.querySelector(".defaultPatrolboat");

const playerGameBoardObject = gameBoardFactory(10);
const computerGameBoardObject = gameBoardFactory(10);
const draggables = document.querySelectorAll(".draggable");
let placementDirection = true;

startGameButton.addEventListener("click", () => {
  const defaultContainers = document.querySelectorAll(".default");
  const defaultContainersArray = Array.from(defaultContainers);
  let filteredDefaultContainers = defaultContainersArray.filter((container) => {
    return container.children.length > 0;
  });
  console.log("test");
  if (filteredDefaultContainers.length !== 0) return;
  runGame();
});

function runGame() {
  playerGameBoardObject;
  placementBoard.classList.add("hide");
  computerGameBoard.classList.remove("hide");

  if (computerGameBoard.children.length < 100) {
    for (let i = 0; i < computerGameBoardObject.grid.length; i++) {
      let gridBox = document.createElement("div");
      gridBox.style.width = "10%";
      gridBox.style.height = "10%";
      gridBox.style.border = "solid black .5px";
      gridBox.dataset.boxNumber = i;
      gridBox.classList.add("container");
      computerGameBoard.appendChild(gridBox);
    }
  }
  try {
    for (let ship of shipArray) {
      placementDirection = Math.random() < 0.5 ? true : false;
      placementDirection == true
        ? (placementDirection = "Vertical")
        : (placementDirection = "Horizontal");

      let random100 = Math.floor(Math.random() * 100);

      try {
        computerGameBoardObject.placeShip(ship, placementDirection, random100);
      } catch (e) {
        for (let i = random100; i < random100 + 100; i++) {
          try {
            computerGameBoardObject.placeShip(
              ship,
              placementDirection,
              i % 100
            );
            break;
          } catch (e) {
            console.log(e);
            continue;
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

resetGameButton.addEventListener("click", (e) => {
  playerGameBoardObject.grid.forEach((tile, index) => {
    if (tile !== "w") {
      playerGameBoardObject.grid[index] = "w";
    }
    tile = "w";
  });

  computerGameBoardObject.grid.forEach((tile, index) => {
    if (tile !== "w") {
      computerGameBoardObject.grid[index] = "w";
    }
    tile = "w";
  });

  e.preventDefault();
  const playerBoardSpaces = document.querySelectorAll(
    ".player-board > .container"
  );

  placementBoard.classList.remove("hide");
  computerGameBoard.classList.add("hide");
  computerGameBoard.replaceChildren();

  playerBoardSpaces.forEach((space) => {
    space.style.backgroundColor = "#d4f1f9";
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

  placementDirection = true;
  shipContainer.style.flexDirection = "row";
  document.querySelectorAll(".default").forEach((container) => {
    container.classList.remove("horizontal");
    container.classList.add("vertical");
    container.querySelector(".draggable").style.width = "100%";
    container.querySelector(".draggable").style.height = "100%";
  });

  // board game approach
  // console.log(playerGameBoard.forEach((node) => console.log(node)));
});

rotateShipButton.addEventListener("click", (e) => {
  e.preventDefault();
  placementDirection = !placementDirection;

  if (placementDirection === false) {
    shipContainer.style.flexDirection = "column";
    document.querySelectorAll(".default").forEach((container) => {
      container.classList.remove("vertical");
      container.classList.add("horizontal");
    });
  } else {
    shipContainer.style.flexDirection = "row";
    document.querySelectorAll(".default").forEach((container) => {
      container.classList.remove("horizontal");
      container.classList.add("vertical");
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
        e.target.style.backgroundColor = "grey";
      }
      if (placementDirection === false) {
        e.target.style.width = `${foundElement.clientWidth}px`;
        e.target.style.height = `100%`;
        e.target.style.backgroundColor = "grey";
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
      // Checking What Tiles Have Ships and Changing Background Color
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
      // If there is an error in placement for whatever reason it will occupy 1 space and be marked red and still be movable
      if (e.target.firstChild) {
        console.log(e.target.firstChild.classList);
        e.target.firstChild.style.backgroundColor = "red";
        e.target.firstChild.draggable = true;
      }
    }
    // console.log(playerGameBoardObject.grid);
  });
}

initializeApp();
