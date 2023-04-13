const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, nPeople) {
  const PAD = 1;

  let minDiff = Infinity;
  const total = nPeople.flat().reduce((acc, cur) => acc + cur, 0);
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const start = [
    [1, 1],
    [1, N],
    [N, 1],
    [N, N],
  ];
  const inRange = [
    (x, y, d1, d2) => (r, c) => r < x + d1 && c <= y && r + c < x + y,
    (x, y, d1, d2) => (r, c) => r <= x + d2 && y < c && y - x < c - r,
    (x, y, d1, d2) => (r, c) =>
      x + d1 <= r && c < y - d1 + d2 && x - y + 2 * d1 < r - c,
    (x, y, d1, d2) => (r, c) =>
      x + d2 < r && y - d1 + d2 <= c && x + y + 2 * d2 < r + c,
  ];

  const outOfBound = (r, c) => r < 1 || c < 1 || N + PAD <= r || N + PAD <= c;
  const count = ([startR, startC], inRange, visited) => {
    let total = 0;
    let head = 0;
    const queue = [];
    visited[startR][startC] = true;
    total += nPeople[startR - PAD][startC - PAD];
    queue.push([startR, startC]);

    while (queue.length - head) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (visited[nr][nc]) continue;
        if (!inRange(nr, nc)) continue;

        visited[nr][nc] = true;
        total += nPeople[nr - PAD][nc - PAD];
        queue.push([nr, nc]);
      }
    }

    return total;
  };

  for (let x = 1; x < N + PAD; x++) {
    for (let y = 1; y < N + PAD; y++) {
      for (let d1 = 1; 1 <= y - d1; d1++) {
        for (let d2 = 1; y + d2 <= N && x + d1 + d2 < N + PAD; d2++) {
          let rest = total;
          const curNPeople = Array(5).fill(0);
          const visited = Array.from(Array(N + PAD), () =>
            Array(N + PAD).fill(false)
          );
          for (let section = 0; section < start.length; section++) {
            curNPeople[section] = count(
              start[section],
              inRange[section](x, y, d1, d2),
              visited
            );
            rest -= curNPeople[section];
          }
          curNPeople[4] = rest;

          const min = Math.min(...curNPeople);
          const max = Math.max(...curNPeople);
          minDiff = Math.min(minDiff, max - min);
        }
      }
    }
  }

  return minDiff;
}

const N = Number(input.shift());
const nPeople = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, nPeople));
