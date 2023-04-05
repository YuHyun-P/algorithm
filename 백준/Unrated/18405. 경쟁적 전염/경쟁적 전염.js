const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, S, X, Y, board) {
  const [INDEX, DISTANCE] = [0, 1];
  const EMPTY = 0;

  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const virus = [];
  const distance = Array.from(Array(N), () =>
    Array.from(Array(N), () => [0, -1])
  );

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const bfs = (virus) => {
    let head = 0;
    const queue = [];
    virus.forEach(([index, r, c]) => {
      queue.push([index, r, c]);
      distance[r][c][INDEX] = index;
      distance[r][c][DISTANCE] = 0;
    });

    while (queue.length - head) {
      const [index, r, c] = queue[head++];

      if (distance[r][c][INDEX] !== index) continue;
      const nextDistance = distance[r][c][DISTANCE] + 1;

      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (board[nr][nc] !== EMPTY) continue;

        const [prevIndex, prevDistance] = distance[nr][nc];
        const canMove =
          prevDistance === -1 ||
          nextDistance < prevDistance ||
          (nextDistance === prevDistance && index < prevIndex);
        if (!canMove) continue;

        distance[nr][nc][INDEX] = index;
        distance[nr][nc][DISTANCE] = nextDistance;

        queue.push([index, nr, nc]);
      }
    }
  };

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] === EMPTY) continue;
      virus.push([board[r][c], r, c]);
    }
  }

  bfs(virus);
  const [index, minDistance] = distance[X - 1][Y - 1];
  return minDistance <= S ? index : 0;
}

const [N, K] = input.shift().split(" ").map(Number);
const [S, X, Y] = input.pop().split(" ").map(Number);
const board = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, K, S, X, Y, board));
