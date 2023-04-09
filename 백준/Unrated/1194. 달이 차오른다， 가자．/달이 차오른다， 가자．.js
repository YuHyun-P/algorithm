const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const N_KEY = 0;
  const [EMPTY, WALL, START, EXIT] = [".", "#", "0", "1"];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let start;
  const distance = Array.from(Array(N), () =>
    Array.from(Array(M), () => Array(2 ** N_KEY).fill(Infinity))
  );

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const toIndex = (alphabet) =>
    alphabet.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  const isKey = (alphabet) => /[a-f]/.test(alphabet);
  const isDoor = (alphabet) => /[A-F]/.test(alphabet);
  const bfs = (startR, startC, startKey) => {
    let head = 0;
    const queue = [[startR, startC, startKey]];
    distance[startR][startC][startKey] = 0;

    while (queue.length - head) {
      const [r, c, key] = queue[head++];
      const next = distance[r][c][key] + 1;

      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;

        const cell = board[nr][nc];
        if (cell === WALL) continue;

        let nextKey = key;
        if (isKey(cell)) nextKey |= 1 << toIndex(cell);
        if (isDoor(cell) && (key & (1 << toIndex(cell))) === 0) continue;
        if (distance[nr][nc][nextKey] <= next) continue;

        distance[nr][nc][nextKey] = next;
        queue.push([nr, nc, nextKey]);

        if (cell === EXIT) return next;
      }
    }

    return -1;
  };

  for (let index = 0; index < N * M; index++) {
    const [r, c] = [Math.floor(index / M), index % M];
    if (board[r][c] === START) {
      start = [r, c];
      break;
    }
  }

  return bfs(...start, 0);
}

const [N, M] = input.shift().split(" ").map(Number);
console.log(solution(N, M, input));
