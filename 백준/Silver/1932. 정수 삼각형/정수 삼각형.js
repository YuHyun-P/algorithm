const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, triangle) {
  for (let height = 1; height < n; height++) {
    for (let index = 0; index < triangle[height].length; index++) {
      triangle[height][index] = Math.max(
        triangle[height][index] + (triangle[height - 1][index - 1] ?? 0),
        triangle[height][index] + (triangle[height - 1][index] ?? 0)
      );
    }
  }

  return Math.max(...triangle[n - 1]);
}

const n = Number(input.shift());
const triangle = input.map((row) => row.split(" ").map(Number));
console.log(solution(n, triangle));
