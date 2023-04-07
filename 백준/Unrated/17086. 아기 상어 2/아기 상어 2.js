const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, board) {
  const [EMPTY, SHARK] = ["0", "1"];
  const direction = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  const shark = [];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || M <= c;
  const bfs = (shark) => {
    let max = 0;
    let head = 0;
    const queue = [];
    const distance = Array.from(Array(N), () => Array(M).fill(-1));

    shark.forEach(([r, c]) => {
      queue.push([r, c]);
      distance[r][c] = 0;
    });

    while (queue.length - head) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (distance[nr][nc] !== -1) continue;

        distance[nr][nc] = distance[r][c] + 1;
        queue.push([nr, nc]);

        if (max < distance[nr][nc]) max = distance[nr][nc];
      }
    }
    return max;
  };

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (board[r][c] === EMPTY) continue;
      shark.push([r, c]);
    }
  }

  return bfs(shark);
}

const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(" "));
console.log(solution(N, M, board));
