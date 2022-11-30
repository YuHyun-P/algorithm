const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);

const fill = (start, end, target) => {
  for (let line = start; line < end; line++) {
    const row = input[line].trim().split(" ").map(Number);
    target.push(row);
  }
};

const getPrefixSum = (table) => {
  const N = table.length;
  const prefixSum = Array.from(Array(N + 1), () => Array(N + 1).fill(0));

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      prefixSum[row + 1][col + 1] += prefixSum[row + 1][col] + table[row][col];
    }
  }

  for (let col = 0; col < N; col++) {
    for (let row = 0; row < N; row++) {
      prefixSum[row + 1][col + 1] += prefixSum[row][col + 1];
    }
  }

  return prefixSum;
};

const table = [];
const request = [];

fill(1, 1 + N, table);
fill(1 + N, 1 + N + M, request);

const prefixSum = getPrefixSum(table);
console.log(
  request
    .map(
      ([x1, y1, x2, y2]) =>
        prefixSum[x2][y2] -
        prefixSum[x2][y1 - 1] -
        prefixSum[x1 - 1][y2] +
        prefixSum[x1 - 1][y1 - 1]
    )
    .reduce((acc, answer) => (acc += "\n" + answer), "")
    .trim()
);
