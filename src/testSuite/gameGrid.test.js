const gameGrid = require("./gameGrid");

test("Creates 100 Spaces", () => {
  expect(gameGrid(10).length).toBe(100);
});

test("Game Grid #88 to be [8,8]", () => {
  expect(gameGrid(10)[88]).toEqual([8, 8]);
});

test("Game Grid #64 to be [6,4]", () => {
  expect(gameGrid(10)[88]).toEqual([8, 8]);
});

test("Creates 1 Square", () => {
  expect(gameGrid(1).length).toBe(1);
});
