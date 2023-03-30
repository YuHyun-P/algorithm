const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(K, chapters) {
  const dp = Array.from(Array(K), () => Array(K).fill(0));
  const prefixSum = Array(K).fill(0);
  const sum = (start, end) => prefixSum[end] - (prefixSum[start - 1] ?? 0);

  for (let i = 0; i < K; i++) {
    prefixSum[i] = (prefixSum[i - 1] ?? 0) + chapters[i];
  }

  for (let offset = 1; offset < K; offset++) {
    for (let start = 0; start + offset < K; start++) {
      const end = start + offset;
      dp[start][end] = Math.min(
        chapters[start] + dp[start + 1][end] + sum(start + 1, end),
        dp[start][end - 1] + sum(start, end - 1) + chapters[end]
      );
      for (let mid = start + 1; mid < end - 1; mid++) {
        dp[start][end] = Math.min(
          dp[start][end],
          dp[start][mid] + dp[mid + 1][end] + sum(start, end)
        );
      }
    }
  }

  return dp[0][K - 1];
}

let cursor = 0;
const T = Number(input[cursor++].trim());
const answer = Array(T).fill(0);
for (let t = 0; t < T; t++) {
  let K = Number(input[cursor++].trim());
  const chapters = input[cursor++].trim().split(" ").map(Number);
  answer[t] = solution(K, chapters);
}

console.log(answer.join("\n"));
