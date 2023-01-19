const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(query) {
  const calcMax = ([L, P, V]) => Math.floor(V / P) * L + Math.min(V % P, L);

  return query
    .map(calcMax)
    .map((answer, index) => `Case ${index + 1}: ${answer}`)
    .join("\n");
}

input.pop();
const query = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(query));
