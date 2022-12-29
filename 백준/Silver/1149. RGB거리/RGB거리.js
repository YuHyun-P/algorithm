const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, house) {
  const dp = house.map((rgb) => [...rgb]);
  for (let index = 1; index < N; index++) {
    dp[index][0] += Math.min(dp[index - 1][1], dp[index - 1][2]);
    dp[index][1] += Math.min(dp[index - 1][0], dp[index - 1][2]);
    dp[index][2] += Math.min(dp[index - 1][0], dp[index - 1][1]);
  }

  return Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]);
}

const N = Number(input.shift().trim());
const house = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, house));
