const shipFactoryFunction = require("./shipFactoryFunction");

const ship1 = shipFactoryFunction("Carrier", 5);

test("Test Ship Length Input", () => {
  expect(ship1.length).toBe(5);
});

test("Test Ship Name", () => {
  expect(ship1.name).toBe("carrier");
});

test("Test to see correct ship spaces", () => {
  expect(shipFactoryFunction("Carrier", 5).spaces).toEqual([
    "o",
    "o",
    "o",
    "o",
    "o",
  ]);
});

test("Test to see correct ship spaces", () => {
  expect(shipFactoryFunction("Carrier", 5).spaces).toEqual([
    "o",
    "o",
    "o",
    "o",
    "o",
  ]);
});
