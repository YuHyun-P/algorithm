const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";

const parentheses = fs.readFileSync(path).toString().trim();
let leftCount = 0;
let stickCount = 0;
let cursor = 0;

while (cursor < parentheses.length) {
  const cur = parentheses[cursor];
  switch (cur) {
    case "(":
      if (parentheses[cursor + 1] === ")") {
        stickCount += leftCount;
        cursor += 1;
        break;
      }

      leftCount += 1;
      break;
    case ")":
      leftCount -= 1;
      stickCount += 1;
      break;
    default:
      throw new Error(`Invalid cur ${cur}`);
  }
  cursor += 1;
}
console.log(stickCount);
