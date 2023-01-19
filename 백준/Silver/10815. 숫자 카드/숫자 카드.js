const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(card, query) {
  const set = new Set(card.split(" ").map(Number));
  return query
    .split(" ")
    .map((char) => (set.has(Number(char)) ? 1 : 0))
    .join(" ");
}

console.log(solution(input[1].trim(), input[3].trim()));
