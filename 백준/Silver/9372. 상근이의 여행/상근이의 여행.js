const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

input.shift();
const answer = [];

let line = 0;
while (line < input.length) {
  const [N, M] = input[line++].trim().split(" ").map(Number);
  answer.push(N - 1);
  line += M;
}

console.log(answer.join("\n"));
