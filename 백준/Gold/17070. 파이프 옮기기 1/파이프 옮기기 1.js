const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, house) {
  const SHAPE = 3;
  const requireAdjacent = [
    [[0, 0]],
    [[0, 0]],
    [
      [-1, 0],
      [0, -1],
      [0, 0],
    ],
  ];

  const dp = Array.from(Array(N), () =>
    Array.from(Array(N), () => Array(SHAPE).fill(0))
  );
  dp[0][1][0] = 1;

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const isEmpty = (r, c) => house[r][c] === 0;
  const getDp = (r, c, shape) => (outOfBound(r, c) ? 0 : dp[r][c][shape]);

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      for (let shape = 0; shape < SHAPE; shape++) {
        const adjacent = requireAdjacent[shape].map(([dr, dc]) => [
          r + dr,
          c + dc,
        ]);

        const reachable = adjacent.every(
          ([adjR, adjC]) => !outOfBound(adjR, adjC) && isEmpty(adjR, adjC)
        );

        if (!reachable) continue;

        if (shape === 0) {
          dp[r][c][shape] += getDp(r, c - 1, 0) + getDp(r, c - 1, 2);
        } else if (shape === 1) {
          dp[r][c][shape] += getDp(r - 1, c, 1) + getDp(r - 1, c, 2);
        } else if (shape === 2) {
          dp[r][c][shape] +=
            getDp(r - 1, c - 1, 0) +
            getDp(r - 1, c - 1, 1) +
            getDp(r - 1, c - 1, 2);
        }
      }
    }
  }

  return dp[N - 1][N - 1][0] + dp[N - 1][N - 1][1] + dp[N - 1][N - 1][2];
}

const N = Number(input.shift().trim());
const house = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, house));
