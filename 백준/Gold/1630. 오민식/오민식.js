const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N) {
  let total = 1;
  const dp = Array.from(Array(N + 1), (_, i) => i);

  for (let i = 2; i < N + 1; i++) {
    total = (total * dp[i]) % 987654321;
    for (let j = 2; i * j < N + 1; j++) {
      dp[i * j] /= dp[i];
    }
  }

  return total;
}

const N = Number(input[0].trim());
console.log(solution(N));
