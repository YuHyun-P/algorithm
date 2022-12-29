const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(arr) {
  const LIMIT = 11;
  const dp = Array(LIMIT + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let index = 4; index < dp.length; index++) {
    dp[index] = dp[index - 1] + dp[index - 2] + dp[index - 3];
  }
  return arr.map((num) => dp[num]);
}

input.shift();
const arr = input.map((row) => Number(row.trim()));
console.log(solution(arr).join("\n"));
