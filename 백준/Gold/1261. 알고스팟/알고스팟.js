const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const wall = Array.from(Array(M), () => Array(N).fill(Infinity));
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let min = Infinity;

  const outOfBound = (row, col) => row < 0 || col < 0 || M <= row || N <= col;
  const bfs = (startRow, startCol) => {
    let head = 0;
    const queue = [[startRow, startCol]];
    wall[startRow][startCol] = board[startRow][startCol];

    while (queue.length - head) {
      const [row, col] = queue[head++];

      for (let i = 0; i < dr.length; i++) {
        const nextRow = row + dr[i];
        const nextCol = col + dc[i];
        if (outOfBound(nextRow, nextCol)) continue;

        const nextWall = wall[row][col] + board[nextRow][nextCol];
        if (wall[nextRow][nextCol] <= nextWall) continue;

        wall[nextRow][nextCol] = nextWall;
        queue.push([nextRow, nextCol]);
      }
    }
  };

  bfs(0, 0);
  return wall[M - 1][N - 1];
}

const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split("").map(Number));
console.log(solution(N, M, board));
