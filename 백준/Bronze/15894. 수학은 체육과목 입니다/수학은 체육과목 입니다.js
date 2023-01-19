const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N) {
  return N * 4;
}

console.log(solution(Number(input[0].trim())));
