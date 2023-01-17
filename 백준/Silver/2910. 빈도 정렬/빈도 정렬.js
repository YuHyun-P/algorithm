const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(sequence) {
  const FREQUENCY = 1;
  const map = new Map();
  for (const num of sequence) {
    map.set(num, (map.get(num) ?? 0) + 1);
  }
  const sorted = [...map.entries()].sort((a, b) => b[FREQUENCY] - a[FREQUENCY]);
  return sorted
    .map(([num, frequency]) => `${num} `.repeat(frequency).trim())
    .join(" ");
}

const [N, C] = input.shift().trim().split(" ").map(Number);
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(sequence));
