const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const [EMPTY, WALL, VIRUS] = [0, 1, 2];

  let min = Infinity;
  let allDistance = null;
  let nEmpty = 0;
  const virus = [];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] === EMPTY) nEmpty += 1;
      if (board[r][c] !== VIRUS) continue;
      virus.push([r, c]);
    }
  }

  if (nEmpty === 0) return 0;

  allDistance = Array.from(Array(N), () =>
    Array.from(Array(N), () => Array(virus.length).fill(-1))
  );

  const bfs = (index, startR, startC) => {
    let head = 0;
    const queue = [[startR, startC]];
    allDistance[startR][startC][index] = 0;

    while (queue.length - head) {
      const [r, c] = queue[head++];

      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (board[nr][nc] === WALL) continue;
        if (allDistance[nr][nc][index] !== -1) continue;

        allDistance[nr][nc][index] = allDistance[r][c][index] + 1;
        queue.push([nr, nc]);
      }
    }
  };
  const getCombination = (base, limit, pick) => {
    if (pick === 1)
      return Array.from(Array(limit - base), (_, i) => [i + base]);

    const combination = [];
    for (let i = base; i < limit - pick + 1; i++) {
      const suffix = getCombination(i + 1, limit, pick - 1);
      suffix.forEach((suffixArray) => {
        combination.push([i, ...suffixArray]);
      });
    }
    return combination;
  };

  for (let index = 0; index < virus.length; index++) {
    bfs(index, ...virus[index]);
  }

  const combination = getCombination(0, virus.length, M);
  for (const activatedVirus of combination) {
    let max = -1;

    for (let i = 0; i < N * N; i++) {
      const [r, c] = [Math.floor(i / N), i % N];
      if (board[r][c] === WALL) continue;
      if (board[r][c] === VIRUS) continue;

      const cellMin = activatedVirus.reduce(
        (acc, index) =>
          allDistance[r][c][index] === -1
            ? acc
            : Math.min(acc, allDistance[r][c][index]),
        Infinity
      );

      if (cellMin === Infinity) {
        max = -1;
        break;
      }

      max = Math.max(max, cellMin);
      if (max >= min) break;
    }

    if (max === -1) continue;
    min = Math.min(min, max);
  }

  return min !== Infinity ? min : -1;
}

const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, board));
