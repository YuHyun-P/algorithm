const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M] = input.shift().trim().split(" ").map(Number);
const board = input.map((line) => line.trim().split(" ").map(Number));

const dRow = [0, 1, 0, -1];
const dCol = [1, 0, -1, 0];
const visited = Array.from(Array(N), () => Array(M).fill(false));
let max = 0;

const isValid = (row, col) => 0 <= row && row < N && 0 <= col && col < M;
const dfs = (row, col, level, sum) => {
  if (level === 3) {
    max = Math.max(max, sum);
    return;
  }

  for (let move = 0; move < 4; move++) {
    const nextRow = row + dRow[move];
    const nextCol = col + dCol[move];
    if (!isValid(nextRow, nextCol) || visited[nextRow][nextCol]) {
      continue;
    }

    // ㅡ ㄴ ㅁ
    visited[nextRow][nextCol] = true;
    dfs(nextRow, nextCol, level + 1, sum + board[nextRow][nextCol]);
    visited[nextRow][nextCol] = false;

    if (level === 1) {
      // ㅏ
      const nextNextRow = row + dRow[(move + 1) % 4];
      const nextNextCol = col + dCol[(move + 1) % 4];
      if (
        !isValid(nextNextRow, nextNextCol) ||
        visited[nextNextRow][nextNextCol]
      ) {
        continue;
      }

      dfs(
        nextNextRow,
        nextNextCol,
        level + 2,
        sum + board[nextRow][nextCol] + board[nextNextRow][nextNextCol]
      );
    }
  }
};
board.forEach((row, rowIndex) =>
  row.forEach((col, colIndex) => {
    visited[rowIndex][colIndex] = true;
    dfs(rowIndex, colIndex, 0, col);
    visited[rowIndex][colIndex] = false;
  })
);
console.log(max);
