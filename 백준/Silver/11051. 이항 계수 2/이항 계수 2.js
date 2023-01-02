const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K) {
  const dp = Array.from(Array(N + 1), (_, index) => Array(index + 1).fill(1));
  for (let n = 2; n < dp.length; n++) {
    for (let k = 1; k < dp[n].length - 1; k++) {
      dp[n][k] = (dp[n - 1][k - 1] + dp[n - 1][k]) % 10007;
    }
  }

  return dp[N][K];
}

const [N, K] = input[0].trim().split(" ").map(Number);
console.log(solution(N, K));
