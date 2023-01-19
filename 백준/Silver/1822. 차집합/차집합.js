const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(a, b) {
  const setB = new Set(b.split(" ").map(Number));
  const diff = a
    .split(" ")
    .filter((char) => !setB.has(Number(char)))
    .sort((a, b) => a - b);

  return [diff.length, diff.join(" ")].join("\n").trim();
}

console.log(solution(input[1].trim(), input[2].trim()));
