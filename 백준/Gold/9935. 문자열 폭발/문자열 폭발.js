const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(text, pattern) {
  const stack = [];

  const hasPattern = () => {
    if (stack.length < pattern.length) return false;

    let index = stack.length - pattern.length;
    for (const char of pattern) {
      if (stack[index++] !== char) return false;
    }
    return true;
  };
  const remove = () => {
    for (let i = 0; i < pattern.length; i++) stack.pop();
  };

  for (const char of text) {
    stack.push(char);
    if (hasPattern()) remove();
  }

  return stack.length === 0 ? "FRULA" : stack.join("");
}

const text = input[0].trim();
const pattern = input[1].trim();
console.log(solution(text, pattern));
