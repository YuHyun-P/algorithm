const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

const n = Number(input);
const getMaxIntegerSqrt = (n) => {
  return Math.floor(Math.sqrt(n));
};

const dp = Array(n + 1).fill(0);
for (let target = 1; target <= n; target++) {
  const sqrt = getMaxIntegerSqrt(target);
  if (target === sqrt ** 2) {
    dp[target] = 1;
    continue;
  }

  let min = 4;
  for (let i = 1; i <= sqrt; i++) {
    min = Math.min(dp[target - i ** 2] + 1, min);
  }
  dp[target] = min;
}

console.log(dp[n]);
