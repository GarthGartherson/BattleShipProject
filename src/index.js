import "./style.css";
import gameBoardFactory from "./testSuite/boardFactory";
import regeneratorRuntime from "regenerator-runtime";
import { player1 } from "./testSuite/players";

import "./testSuite/shipArray.js";
import { shipArray, computerShipArray } from "./testSuite/shipArray.js";

// buttons
const rotateShipButton = document.querySelector(".button-rotate-ship");
const startGameButton = document.querySelector(".button-start-game");
const resetGameButton = document.querySelector(".button-reset-game");

// Game Boards && Text
const promptText = document.querySelector(".board-text");
const playerGameBoard = document.querySelector(".player-board");
const computerGameBoard = document.querySelector(".computer-board");
const shipContainer = document.querySelector(".ship-container");
const placementBoard = document.querySelector(".placement-board");

const playerGameBoardObject = gameBoardFactory(10);
const computerGameBoardObject = gameBoardFactory(10);
const draggables = document.querySelectorAll(".draggable");
const playerBoardContainers = document.querySelectorAll(
  ".player-board > .container"
);

// Setup
let placementDirection = true;

startGameButton.addEventListener("click", () => {
  const defaultContainers = document.querySelectorAll(".default");
  const defaultContainersArray = Array.from(defaultContainers);
  let filteredDefaultContainers = defaultContainersArray.filter((container) => {
    return container.children.length > 0;
  });
  if (filteredDefaultContainers.length !== 0) return;
  runGame();
});

function runGame() {
  let remainingSpaces = [];
  for (let i = 0; i < 100; i++) {
    remainingSpaces.push(i);
  }

  // playerGameBoardObject;
  draggables.forEach((draggable) => (draggable.style.opacity = 0));

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

  // While Game Is Not Finished Take Turns
  let gameFinished = false;
  promptText.textContent = "Player's Turn!";

  document.addEventListener("click", (e) => {
    if (gameFinished === true) return;

    let selectedTile = parseInt(
      e.target.closest(".container").dataset.boxNumber
    );
    // Players Turn. Checksif tile is h/m and if so then it short circuits
    if (e.target.closest(".computer-board") && player1.isTurn === true) {
      if (computerGameBoardObject.grid[selectedTile] === "h") return;
      if (computerGameBoardObject.grid[selectedTile] === "m") return;
      // if not targets the enemy board
      let boat = computerGameBoardObject.receiveAttack(
        computerGameBoardObject,
        computerShipArray,
        selectedTile
      );
      // runs through board checking for m's and h's and colors the spaces accordingly
      positiveCheckBoard(computerGameBoardObject, "m", "white");
      positiveCheckBoard(computerGameBoardObject, "h", "red");

      if (typeof boat !== "undefined" && typeof boat === "object") {
        if (computerGameBoardObject.boardAllSunk(computerShipArray) === true) {
          gameFinished = true;
          promptText.textContent = "Player WINS!";
        }
      }
      if (gameFinished == true) return;
      player1.isTurn = !player1.isTurn;
      promptText.textContent = "Computer's Turn";
    }

    if (e.target.closest(".player-board") && player1.isTurn === false) {
      let randomArrayPosiition = Math.floor(
        Math.random() * remainingSpaces.length
      );
      remainingSpaces.splice(randomArrayPosiition, 1);

      if (playerGameBoardObject.grid[selectedTile] === "h") return;
      if (playerGameBoardObject.grid[selectedTile] === "m") return;
      playerGameBoardObject.receiveAttack(
        playerGameBoardObject,
        shipArray,
        randomArrayPosiition
      );
      positiveCheckBoard(playerGameBoardObject, "m", "white");
      positiveCheckBoard(playerGameBoardObject, "h", "red");

      if (typeof boat !== "undefined" && typeof boat === "object") {
        if (playerGameBoardObject.boardAllSunk(shipArray) == true) {
          gameFinished = true;
          promptText.textContent = "Computer WINS!";
        }
      }
      if (gameFinished == true) return;
      player1.isTurn = !player1.isTurn;
      promptText.textContent = "Player's Turn";
    }
  });
}

resetGameButton.addEventListener("click", (e) => {
  promptText.textContent = "Place Your Ships!";
  shipArray.forEach((ship) => {
    ship.isSunk = false;
    ship.spaces.forEach((space) => (space = "o"));
  });
  computerShipArray.forEach((ship) => {
    ship.isSunk = false;
    ship.spaces.forEach((space) => (space = "o"));
  });

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
      space.remove(element);
      space.style.backgroundColor = "";
    }
  });

  draggables.forEach((draggable) => {
    draggable.draggable = true;

    if (!draggable.closest(".container").classList.contains("default")) {
      draggable.style.backgroundColor = "grey";
      draggable.style.opacity = "1";
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
        if (container.firstChild) return;
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
        negativeCheckBoard(playerGameBoardObject, "w", "green");
      }
      // Checking What Tiles Have Ships and Changing Background Color
    } catch (err) {
      console.log(err);
      // If there is an error in placement for whatever reason it will occupy 1 space and be marked red and still be movable
      if (e.target.firstChild) {
        e.target.firstChild.style.backgroundColor = "red";
        e.target.firstChild.draggable = true;
      }
    }
  });
}

//Check If each tile ISN'T a certain string
function negativeCheckBoard(board, string, color) {
  let nonEmptyBoxes = [];
  for (let [index, box] of board.grid.entries()) {
    // if (shipArray.includes(box)) continue;
    if (box !== `${string}`) {
      nonEmptyBoxes.push(index);
    }
  }
  for (let boxNumber of nonEmptyBoxes) {
    let element = document.querySelector(`[data-box-number="${boxNumber}"]`);
    element.style.backgroundColor = `${color}`;
  }
}

// Check if each tile IS a certain string
function positiveCheckBoard(board, string, color) {
  let nonEmptyBoxes = [];
  for (let [index, box] of board.grid.entries()) {
    if (box === `${string}`) {
      nonEmptyBoxes.push(index);
    }
  }
  for (let boxNumber of nonEmptyBoxes) {
    if (player1.isTurn === true) {
      let element = document.querySelector(
        `.computer-board > [data-box-number="${boxNumber}"]`
      );
      element.style.backgroundColor = `${color}`;
    }
    if (player1.isTurn === false) {
      let element = document.querySelector(
        `.player-board > [data-box-number="${boxNumber}"]`
      );
      element.style.backgroundColor = `${color}`;
    }
  }
}

initializeApp();
