const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, memories, costs) {
  const maxCost = costs.reduce((acc, cur) => acc + cur, 0);
  const dp = Array.from(Array(N), () => Array(maxCost + 1).fill(0));

  for (let cost = costs[0]; cost < maxCost + 1; cost++) {
    dp[0][cost] = memories[0];
  }

  for (let until = 1; until < N; until++) {
    const [curMemory, curCost] = [memories[until], costs[until]];
    for (let cost = 0; cost < curCost; cost++) {
      dp[until][cost] = dp[until - 1][cost];
    }

    for (let cost = curCost; cost < maxCost + 1; cost++) {
      dp[until][cost] = Math.max(
        dp[until - 1][cost],
        dp[until - 1][cost - curCost] + curMemory
      );
    }
  }

  return dp[N - 1].findIndex((maxMemory) => maxMemory >= M);
}

const [N, M] = input[0].split(" ").map(Number);
const memories = input[1].split(" ").map(Number);
const costs = input[2].split(" ").map(Number);
console.log(solution(N, M, memories, costs));
