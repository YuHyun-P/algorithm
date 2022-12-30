const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(rope) {
  let max = 0;
  rope.sort((a, b) => b - a);
  rope.forEach((weight, index) => {
    max = Math.max(max, weight * (index + 1));
  });
  return max;
}

input.shift();
const rope = input.map((row) => Number(row.trim()));
console.log(solution(rope));
