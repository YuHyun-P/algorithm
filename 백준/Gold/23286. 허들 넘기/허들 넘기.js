const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, T, hurdle, query) {
  const maxH = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
  for (let i = 0; i < N + 1; i++) maxH[i][i] = 0;
  hurdle.forEach(([u, v, h]) => (maxH[u][v] = h));

  for (let k = 1; k < N + 1; k++) {
    for (let i = 1; i < N + 1; i++) {
      for (let j = 1; j < N + 1; j++) {
        maxH[i][j] = Math.min(maxH[i][j], Math.max(maxH[i][k], maxH[k][j]));
      }
    }
  }

  return query
    .map(([s, e]) => (maxH[s][e] !== Infinity ? maxH[s][e] : -1))
    .join("\n");
}

const [N, M, T] = input.shift().trim().split(" ").map(Number);
const hurdle = input
  .splice(0, M)
  .map((row) => row.trim().split(" ").map(Number));
const query = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, T, hurdle, query));
