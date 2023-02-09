const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, r, c, d, board) {
  const WALL = 1;

  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const canMove = (r, c) =>
    !outOfBound(r, c) && board[r][c] !== WALL && !visited[r][c];

  let count = 0;
  visited[r][c] = true;
  count += 1;

  while (true) {
    for (let iter = 0; iter < dr.length; iter++) {
      d = (d - 1 + dr.length) % dr.length;
      const nextR = r + dr[d];
      const nextC = c + dc[d];

      if (canMove(nextR, nextC)) break;
    }

    let nextR = r + dr[d];
    let nextC = c + dc[d];

    if (!canMove(nextR, nextC)) {
      const backR = r - dr[d];
      const backC = c - dc[d];

      if (outOfBound(backR, backC) || board[backR][backC] === WALL) break;

      nextR = backR;
      nextC = backC;
    }

    if (!visited[nextR][nextC]) {
      count += 1;
      visited[nextR][nextC] = true;
    }

    r = nextR;
    c = nextC;
  }

  return count;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const [r, c, d] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, r, c, d, board));
