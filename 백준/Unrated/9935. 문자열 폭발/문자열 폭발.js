const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(text, bomb) {
  const stack = [];
  for (const char of text) {
    stack.push(char);
    if (stack.length < bomb.length) continue;

    const suffix = stack.splice(stack.length - bomb.length, bomb.length);
    if (suffix.join("") !== bomb) stack.push(...suffix);
  }
  return stack.join("") || "FRULA";
}

const bomb = input.pop().trim();
const text = input.pop().trim();
console.log(solution(text, bomb));
