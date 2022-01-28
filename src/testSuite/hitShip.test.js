const hitShip = require("./hitShip");

const ship1 = {
  name: "Cruiser",
  length: 3,
  spaces: ["o", "o", "x"],
  hit(num) {
    if (this.spaces[num] !== "x") {
      this.spaces.splice(num, 1, "x");
      return this.spaces;
    }
    return this.spaces;
  },
  sunk() {
    if (this.spaces.every((el) => el === "x")) {
      this.isSunk = true;
      return this.isSunk;
    }
    return this.isSunk;
  },
  isSunk: false,
};

const ship2 = {
  name: "Cruiser",
  length: 3,
  spaces: ["x", "x", "x"],
  sunk: false,
  hit(num) {
    if (this.spaces[num] !== "x") {
      this.spaces.splice(num, 1, "x");
      return this.spaces;
    }
    return this.spaces;
  },
  sunk() {
    if (this.spaces.every((el) => el === "x")) {
      this.isSunk = true;
      return this.isSunk;
    }
    return this.isSunk;
  },
  isSunk: false,
};

const ship3 = {
  name: "Cruiser",
  length: 3,
  spaces: ["x", "o", "x"],
  sunk: false,
  hit(num) {
    if (this.spaces[num] !== "x") {
      this.spaces.splice(num, 1, "x");
      return this.spaces;
    }
    return this.spaces;
  },
  sunk() {
    if (this.spaces.every((el) => el === "x")) {
      this.isSunk = true;
      return this.isSunk;
    }
    return this.isSunk;
  },
  isSunk: false,
};

test("Hit Ship With Internal Function", () => {
  expect(ship1.hit(2)).toEqual(["o", "o", "x"]);
});

test("Check for false sink", () => {
  expect(ship1.sunk()).toEqual(false);
});

test("Check for false sink 2", () => {
  expect(ship3.sunk()).toEqual(false);
});

test("Check and Change if Sunk Ship is Done", () => {
  expect(ship2.sunk()).toEqual(true);
});
