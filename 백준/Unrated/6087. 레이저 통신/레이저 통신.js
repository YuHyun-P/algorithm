const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(W, H, board) {
  const [EMPTY, WALL, LASER] = [".", "*", "C"];
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const direction = [
    [0, 1, 3],
    [1, 2, 0],
    [2, 3, 1],
    [3, 0, 2],
  ];

  const laser = [];
  const minMirror = Array.from(Array(H), () =>
    Array.from(Array(W), () => Array(direction.length).fill(Infinity))
  );

  const outOfBound = (r, c) => r < 0 || c < 0 || H <= r || W <= c;
  const bfs = (startR, startC) => {
    let head = 0;
    const queue = [];
    for (let dir = 0; dir < dr.length; dir++) {
      queue.push([startR, startC, dir]);
      minMirror[startR][startC][dir] = 0;
    }

    while (queue.length - head) {
      const [r, c, cur] = queue[head++];

      for (const next of direction[cur]) {
        const [nr, nc] = [r + dr[next], c + dc[next]];
        const nMirror = minMirror[r][c][cur] + (cur !== next ? 1 : 0);
        if (outOfBound(nr, nc)) continue;
        if (board[nr][nc] === WALL) continue;
        if (minMirror[nr][nc][next] <= nMirror) continue;

        minMirror[nr][nc][next] = nMirror;
        if (board[nr][nc] === LASER) continue;

        queue.push([nr, nc, next]);
      }
    }
  };

  for (let index = 0; index < H * W; index++) {
    const [r, c] = [Math.floor(index / W), index % W];
    if (board[r][c] !== LASER) continue;
    laser.push([r, c]);
  }
  bfs(...laser[0]);
  const [endR, endC] = laser[1];
  return Math.min(...minMirror[endR][endC]);
}

const [W, H] = input.shift().split(" ").map(Number);
console.log(solution(W, H, input));
