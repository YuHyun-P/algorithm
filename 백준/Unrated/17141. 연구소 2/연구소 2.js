const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const [EMPTY, WALL, VIRUS] = [0, 1, 2];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let min = Infinity;
  let distance = null;
  let combination = null;
  const virus = [];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const bfs = (virus, distance, board) => {
    let head = 0;
    const queue = [];
    virus.forEach(([r, c], index) => {
      queue.push([index, r, c]);
      distance[r][c][index] = 0;
    });

    while (queue.length - head) {
      const [index, r, c] = queue[head++];
      const nextDistance = distance[r][c][index] + 1;

      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];

        if (outOfBound(nr, nc)) continue;
        if (distance[nr][nc][index] !== -1) continue;
        if (board[nr][nc] === WALL) continue;

        distance[nr][nc][index] = nextDistance;
        queue.push([index, nr, nc]);
      }
    }
  };
  const getCombination = (base, limit, pick) => {
    if (pick === 1)
      return Array.from(Array(limit - base), (_, i) => [base + i]);

    const combination = [];
    for (let i = base; i < limit - pick + 1; i++) {
      const suffixCombination = getCombination(i + 1, limit, pick - 1);
      suffixCombination.forEach((suffix) => combination.push([i, ...suffix]));
    }
    return combination;
  };

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] !== VIRUS) continue;
      virus.push([r, c]);
    }
  }

  distance = Array.from(Array(N), () =>
    Array.from(Array(N), () => Array(virus.length).fill(-1))
  );
  combination = getCombination(0, virus.length, M);

  bfs(virus, distance, board);

  for (const activated of combination) {
    let max = -1;
    for (let rc = 0; rc < N * N; rc++) {
      const [r, c] = [Math.floor(rc / N), rc % N];

      if (board[r][c] === WALL) continue;

      let cellMin = Infinity;
      for (const index of activated) {
        if (distance[r][c][index] === -1) continue;
        cellMin = Math.min(cellMin, distance[r][c][index]);
      }

      if (cellMin === Infinity) {
        max = -1;
        break;
      }

      max = Math.max(max, cellMin);
    }

    if (max === -1) continue;
    min = Math.min(min, max);
  }

  return min !== Infinity ? min : -1;
}

const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, board));
