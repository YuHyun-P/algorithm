const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);
const array = input[1].trim().split(" ").map(Number);
const prefixSum = [0];
array.forEach((num) => prefixSum.push(num + prefixSum.at(-1)));

const rangeArray = input
  .slice(2, 2 + M)
  .map((line) => line.trim().split(" ").map(Number));

console.log(
  rangeArray
    .map(([from, to]) => prefixSum[to] - prefixSum[from - 1])
    .reduce((acc, cur) => acc + "\n" + cur, "")
    .trim()
);
