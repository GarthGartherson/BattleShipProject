const boardAllSunk = require("./boardAllSunk");
const shipArray = require("./shipArray");

test("Check that functionality works!", () => {
  expect(boardAllSunk()).toBe(false);
});
