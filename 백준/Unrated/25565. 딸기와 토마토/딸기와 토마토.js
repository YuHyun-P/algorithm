const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, K, board) {
  const [EMPTY, SEED] = ["0", "1"];
  const PAD = 1;
  const direction = [
    [0, 1],
    [1, 0],
  ];

  const plant = [];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const toKey = (r, c) => `${r} ${c}`;
  const getLine = (r, c, dir) => {
    const line = Array(K).fill(null);
    const [dr, dc] = direction[dir];
    for (let k = K - 1; 0 <= k; k--) {
      const curR = r + dr * k;
      const curC = c + dc * k;
      if (outOfBound(curR, curC) || board[curR][curC] === EMPTY) return null;
      line[k] = [curR, curC];
    }
    return line;
  };
  const getIntersection = (lineA, lineB) => {
    const setA = new Set(lineA.map(([r, c]) => toKey(r, c)));
    return lineB.filter(([r, c]) => setA.has(toKey(r, c)));
  };

  for (let index = 0; index < N * M; index++) {
    const [r, c] = [Math.floor(index / M), index % M];
    if (board[r][c] === EMPTY) continue;
    plant.push([r, c]);
  }

  const overlapped = 2 * K - plant.length;
  if (overlapped === 0) return 0;

  let strawberry;
  let tomato;
  const isParallel =
    plant.every(([r, c]) => r === plant[0][0]) ||
    plant.every(([r, c]) => c === plant[0][1]);

  if (!isParallel) {
    for (const [r, c] of plant) {
      const horizontal = getLine(r, c, 0);
      if (horizontal) {
        strawberry = horizontal;
        break;
      }
    }
    for (const [r, c] of plant) {
      const vertical = getLine(r, c, 1);
      if (vertical) {
        tomato = vertical;
        break;
      }
    }
  } else {
    const dir = plant.every(([r, c]) => r === plant[0][0]) ? 0 : 1;
    const [dr, dc] = direction[dir];
    for (const [r, c] of plant) {
      const line = getLine(r, c, dir);
      if (line) {
        strawberry = line;

        const tomatoR = r + dr * (K - overlapped);
        const tomatoC = c + dc * (K - overlapped);
        tomato = getLine(tomatoR, tomatoC, dir);
        break;
      }
    }
  }

  const intersection = getIntersection(strawberry, tomato);
  intersection.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return [
    intersection.length,
    ...intersection.map(([r, c]) => `${r + PAD} ${c + PAD}`),
  ].join("\n");
}

const [N, M, K] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" "));
console.log(solution(N, M, K, board));
