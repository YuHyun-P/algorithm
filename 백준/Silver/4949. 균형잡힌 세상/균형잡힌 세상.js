const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const isPair = (left, right) => {
  switch (left) {
    case "(":
      return right === ")";
    case "[":
      return right === "]";
    default:
      return false;
  }
};

const isBalance = (line) => {
  const stack = [];

  return (
    [...line].every((char) => {
      switch (char) {
        case "(":
        case "[":
          stack.push(char);
          return true;
        case ")":
        case "]":
          const left = stack.pop();
          if (isPair(left, char)) {
            return true;
          }
          return false;
        default:
          return true;
      }
    }) && stack.length === 0
  );
};

let answer = "";
let flag = true;
let index = 0;

while (flag) {
  const line = input[index];

  if (line === ".") {
    flag = false;
    break;
  }

  answer += "\n" + (isBalance(line) ? "yes" : "no");
  index++;
}

console.log(answer.trim());
