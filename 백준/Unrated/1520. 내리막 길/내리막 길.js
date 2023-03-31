const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, N, height) {
  const [INIT, BLOCKED] = [-1, 0];
  const direction = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const nCount = Array.from(Array(M), () => Array(N).fill(INIT));

  const outOfBound = (r, c) => r < 0 || c < 0 || M <= r || N <= c;
  const dfs = (r, c) => {
    if (r === M - 1 && c === N - 1) return 1;

    nCount[r][c] = BLOCKED;
    for (const [dr, dc] of direction) {
      const [nextR, nextC] = [r + dr, c + dc];
      if (outOfBound(nextR, nextC)) continue;
      if (height[r][c] <= height[nextR][nextC]) continue;

      switch (nCount[nextR][nextC]) {
        case INIT:
          nCount[r][c] += dfs(nextR, nextC);
          break;
        case BLOCKED:
          break;
        default:
          nCount[r][c] += nCount[nextR][nextC];
      }
    }

    return nCount[r][c];
  };

  return dfs(0, 0);
}

const [M, N] = input.shift().trim().split(" ").map(Number);
const height = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(M, N, height));
