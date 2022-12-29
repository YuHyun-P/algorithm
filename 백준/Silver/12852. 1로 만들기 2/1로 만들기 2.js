const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N) {
  const dp = Array(N + 1).fill(0);
  const prev = Array(N + 1).fill(0);
  const path = [N];
  let cur = N;
  dp[2] = dp[3] = 1;
  prev[2] = prev[3] = 1;

  for (let index = 4; index < dp.length; index++) {
    dp[index] = dp[index - 1] + 1;
    prev[index] = index - 1;

    if (index % 3 === 0 && dp[index / 3] < dp[index] - 1) {
      dp[index] = dp[index / 3] + 1;
      prev[index] = index / 3;
    }

    if (index % 2 === 0 && dp[index / 2] < dp[index] - 1) {
      dp[index] = dp[index / 2] + 1;
      prev[index] = index / 2;
    }
  }

  while (cur > 1) {
    path.push(prev[cur]);
    cur = prev[cur];
  }
  return [dp[N], path.join(" ")];
}

const N = Number(input[0]);
console.log(solution(N).join("\n"));
