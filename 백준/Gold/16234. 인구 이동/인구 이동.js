const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, L, R, nPeople) {
  let nMoved = 0;

  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const [ROW, COL] = [0, 1];

  const outOfOrder = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const canMove = (a, b) => {
    const diff = Math.abs(nPeople[a[ROW]][a[COL]] - nPeople[b[ROW]][b[COL]]);
    return L <= diff && diff <= R;
  };
  const bfs = (startR, startC, visited) => {
    let head = 0;
    const queue = [[startR, startC]];
    visited[startR][startC] = true;

    while (queue.length - head) {
      const [r, c] = queue[head++];

      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfOrder(nr, nc)) continue;
        if (visited[nr][nc]) continue;
        if (!canMove([r, c], [nr, nc])) continue;

        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }

    return queue;
  };
  const move = (target) => {
    const value = Math.floor(
      target.reduce((acc, [r, c]) => acc + nPeople[r][c], 0) / target.length
    );
    target.forEach(([r, c]) => (nPeople[r][c] = value));
  };

  for (nMoved = 0; ; nMoved++) {
    let moved = false;
    const visited = Array.from(Array(N), () => Array(N).fill(false));

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (visited[r][c]) continue;

        const connected = bfs(r, c, visited);
        if (connected.length === 1) continue;

        move(connected);
        moved = true;
      }
    }

    if (!moved) break;
  }

  return nMoved;
}

const [N, L, R] = input.shift().split(" ").map(Number);
const nPeople = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, L, R, nPeople));
