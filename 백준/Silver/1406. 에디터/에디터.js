const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const initialWord = input.shift().trim();
const N = Number(input.shift().trim());
const commands = input.map((row) => row.trim().split(" "));

const left = [...initialWord];
const right = [];

commands.forEach(([command, char]) => {
  switch (command) {
    case "P":
      left.push(char);
      break;
    case "L":
      if (left.length) {
        right.push(left.pop());
      }
      break;
    case "D":
      if (right.length) {
        left.push(right.pop());
      }
      break;
    case "B":
      left.pop();
      break;
    default:
      throw new Error(`Unknown command ${command}`);
  }
});
console.log([...left, ...right.reverse()].join(""));
