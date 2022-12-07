const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = Number(input[0].trim());
const questions = (() => {
  const temp = [];
  for (let line = 1; line < 1 + T; line++) {
    temp.push(input[line].trim());
  }
  return temp;
})();

const isVPS = (question) => {
  const stack = [];

  return (
    [...question].every((parenthesis) => {
      switch (parenthesis) {
        case "(":
          stack.push(parenthesis);
          return true;
        case ")":
          if (stack.length) {
            stack.pop();
            return true;
          }
          return false;
        default:
          return false;
      }
    }) && stack.length === 0
  );
};

console.log(
  questions
    .reduce((acc, cur) => acc + "\n" + (isVPS(cur) ? "YES" : "NO"), "")
    .trim()
);
