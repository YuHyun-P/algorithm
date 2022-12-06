const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const number = input.split(/\-|\+/).map(Number);
const minusFirstIndex = input
  .split(/\d+/)
  .filter((char) => char !== "")
  .indexOf("-");

console.log(
  number.reduce((acc, cur, index) => {
    if (minusFirstIndex >= 0 && index > minusFirstIndex) return acc - cur;
    return acc + cur;
  })
);
