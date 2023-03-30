const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, matrix) {
  const [ROW, COL] = [0, 1];

  const min = Array.from(Array(N), () => Array(N).fill(Infinity));
  for (let i = 0; i < N; i++) {
    min[i][i] = 0;
  }

  for (let offset = 1; offset < N; offset++) {
    for (let start = 0; start + offset < N; start++) {
      const end = start + offset;
      for (let mid = start; mid < end; mid++) {
        min[start][end] = Math.min(
          min[start][end],
          matrix[start][ROW] * matrix[mid][COL] * matrix[end][COL] +
            min[start][mid] +
            min[mid + 1][end]
        );
      }
    }
  }

  return min[0][N - 1];
}

const N = Number(input.shift().trim());
const matrix = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, matrix));
