const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(w, h, board) {
  const OCEAN = "0";

  let island = 0;
  const dr = [0, 1, 1, 1, 0, -1, -1, -1];
  const dc = [1, 1, 0, -1, -1, -1, 0, 1];

  const visited = Array.from(Array(h), () => Array(w).fill(false));

  const outOfBound = (r, c) => r < 0 || c < 0 || h <= r || w <= c;
  const bfs = (startR, startC) => {
    let head = 0;
    const queue = [[startR, startC]];
    visited[startR][startC] = true;

    while (queue.length - head) {
      const [row, col] = queue[head++];

      for (let dir = 0; dir < dr.length; dir++) {
        const nextRow = row + dr[dir];
        const nextCol = col + dc[dir];

        if (outOfBound(nextRow, nextCol)) continue;
        if (visited[nextRow][nextCol]) continue;
        if (board[nextRow][nextCol] === OCEAN) continue;

        visited[nextRow][nextCol] = true;
        queue.push([nextRow, nextCol]);
      }
    }
  };

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (visited[r][c]) continue;
      if (board[r][c] === OCEAN) continue;
      bfs(r, c);
      island += 1;
    }
  }

  return island;
}

let cursor = 0;
const EXIT = "0 0";
const answer = [];
while (input[cursor].trim() !== EXIT) {
  const [w, h] = input[cursor++].trim().split(" ").map(Number);
  const board = input
    .slice(cursor, cursor + h)
    .map((row) => row.trim().split(" "));
  cursor += h;
  answer.push(solution(w, h, board));
}
console.log(answer.join("\n"));
