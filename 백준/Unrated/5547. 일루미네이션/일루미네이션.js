const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(W, H, board) {
  const [EMPTY, BUILDING] = [0, 1];
  const evenDirection = [
    [0, 1],
    [1, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [-1, 1],
  ];
  const oddDirection = [
    [0, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ];

  let length = 0;
  const visited = Array.from(Array(H), () => Array(W).fill(false));

  const outOfBound = (r, c) => r < 0 || c < 0 || H <= r || W <= c;
  const bfs = (startR, startC, visited) => {
    let head = 0;
    const queue = [[startR, startC]];
    visited[startR][startC] = true;

    while (queue.length - head) {
      const [r, c] = queue[head++];
      const direction = r % 2 === 0 ? evenDirection : oddDirection;
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (visited[nr][nc]) continue;
        if (board[nr][nc] === BUILDING) continue;

        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }
  };

  for (let r = 0; r < H; r++) {
    const dc = r === 0 || r === H - 1 ? 1 : W - 1;
    for (let c = 0; c < W; c += dc) {
      if (visited[r][c]) continue;
      if (board[r][c] === BUILDING) continue;

      bfs(r, c, visited);
    }
  }

  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (visited[r][c]) continue;
      if (board[r][c] === EMPTY) continue;

      const direction = r % 2 === 0 ? evenDirection : oddDirection;
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (!outOfBound(nr, nc) && !visited[nr][nc]) continue;
        length += 1;
      }
    }
  }

  return length;
}

const [W, H] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(" ").map(Number));
console.log(solution(W, H, board));
