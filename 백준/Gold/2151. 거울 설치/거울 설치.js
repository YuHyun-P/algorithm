const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, house) {
  const [EMPTY, BLOCK, DOOR, MIRROR] = [".", "*", "#", "!"];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const door = [];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const bfs = ([[startR, startC], [endR, endC]]) => {
    let head = 0;
    const queue = [];
    const minMirror = Array.from(Array(N), () =>
      Array.from(Array(N), () => Array(direction.length).fill(Infinity))
    );

    direction.forEach((_, dir) => {
      queue.push([startR, startC, dir]);
      minMirror[startR][startC][dir] = 0;
    });

    while (queue.length - head) {
      const [r, c, dir] = queue[head++];

      if (house[r][c] !== MIRROR) {
        const [dr, dc] = direction[dir];
        const [nr, nc] = [r + dr, c + dc];

        if (outOfBound(nr, nc)) continue;
        if (house[nr][nc] === BLOCK) continue;
        if (minMirror[nr][nc][dir] <= minMirror[r][c][dir]) continue;

        minMirror[nr][nc][dir] = minMirror[r][c][dir];
        queue.push([nr, nc, dir]);
        continue;
      }

      for (const [nextDir, [dr, dc]] of direction.entries()) {
        const [nr, nc] = [r + dr, c + dc];
        const nextMirror = minMirror[r][c][dir] + (nextDir !== dir ? 1 : 0);

        if (outOfBound(nr, nc)) continue;
        if (house[nr][nc] === BLOCK) continue;
        if (minMirror[nr][nc][nextDir] <= nextMirror) continue;

        minMirror[nr][nc][nextDir] = nextMirror;
        queue.push([nr, nc, nextDir]);
      }
    }

    return minMirror[endR][endC];
  };

  for (let index = 0; index < N * N; index++) {
    const [r, c] = [Math.floor(index / N), index % N];
    if (house[r][c] === DOOR) {
      const length = door.push([r, c]);
      if (length === 2) break;
    }
  }

  return Math.min(...bfs(door));
}

const N = Number(input.shift());
const house = input.map((row) => row.split(""));
console.log(solution(N, house));
