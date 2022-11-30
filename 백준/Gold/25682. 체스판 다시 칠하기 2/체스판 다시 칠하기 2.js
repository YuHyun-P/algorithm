const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const fill = (start, end, target) => {
  for (let line = start; line < end; line++) {
    const row = input[line].trim().split("");
    target.push(row);
  }
};

const getColorAt = (row, col) => ((row + col) % 2 === 0 ? "W" : "B");

const getPrefixSum = (N, M, board) => {
  const prefixSum = Array.from(Array(N + 1), () => Array(M + 1).fill(0));

  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      prefixSum[rowIndex + 1][colIndex + 1] =
        getColorAt(rowIndex, colIndex) === col ? 0 : 1;
    })
  );

  for (let row = 1; row < N + 1; row++) {
    for (let col = 1; col < M + 1; col++) {
      prefixSum[row][col] += prefixSum[row][col - 1];
    }
  }

  for (let col = 1; col < M + 1; col++) {
    for (let row = 1; row < N + 1; row++) {
      prefixSum[row][col] += prefixSum[row - 1][col];
    }
  }

  return prefixSum;
};

const [N, M, K] = input[0].trim().split(" ").map(Number);
const board = [];
fill(1, 1 + N, board);

const prefixSum = getPrefixSum(N, M, board);

let min = Infinity;
for (let row = 0; row < N + 1 - K; row++) {
  for (let col = 0; col < M + 1 - K; col++) {
    const [rightBottomRow, rightBottomCol] = [row + K, col + K];
    const paintCellCount =
      prefixSum[row][col] -
      prefixSum[rightBottomRow][col] -
      prefixSum[row][rightBottomCol] +
      prefixSum[rightBottomRow][rightBottomCol];

    min = Math.min(min, paintCellCount, K * K - paintCellCount);
  }
}

console.log(min);
