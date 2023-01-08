const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const melted = [];
  const outOfBound = (row, col) => row < 0 || col < 0 || N <= row || M <= col;
  const getZeroCount = (row, col) => {
    let count = 0;
    for (let move = 0; move < dr.length; move++) {
      const nextRow = row + dr[move];
      const nextCol = col + dc[move];

      if (outOfBound(nextRow, nextCol) || board[nextRow][nextCol] !== 0) {
        continue;
      }

      count += 1;
    }
    return count;
  };
  const bfs = (startRow, startCol, visited) => {
    let head = 0;
    const queue = [[startRow, startCol]];
    visited[startRow][startCol] = true;
    melted.push([startRow, startCol, getZeroCount(startRow, startCol)]);

    while (queue.length - head) {
      const [row, col] = queue[head++];

      for (let move = 0; move < dr.length; move++) {
        const nextRow = row + dr[move];
        const nextCol = col + dc[move];

        if (
          outOfBound(nextRow, nextCol) ||
          visited[nextRow][nextCol] ||
          board[nextRow][nextCol] === 0
        ) {
          continue;
        }

        visited[nextRow][nextCol] = true;
        queue.push([nextRow, nextCol]);
        melted.push([nextRow, nextCol, getZeroCount(nextRow, nextCol)]);
      }
    }
  };

  let answer = 0;
  for (let year = 0; ; year++) {
    let iceberg = 0;
    const visited = Array.from(Array(N), () => Array(M).fill(false));

    for (let row = 0; row < N && iceberg < 2; row++) {
      for (let col = 0; col < M && iceberg < 2; col++) {
        if (visited[row][col] || board[row][col] === 0) {
          continue;
        }

        iceberg += 1;
        bfs(row, col, visited);
      }
    }

    while (melted.length) {
      const [row, col, count] = melted.pop();
      board[row][col] = Math.max(board[row][col] - count, 0);
    }

    if (iceberg >= 2) {
      answer = year;
      break;
    }

    if (iceberg === 0) {
      break;
    }
  }

  return answer;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, board));
