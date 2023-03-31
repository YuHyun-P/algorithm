const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(W, Q, weights, query) {
  const LIMIT = 40000;

  const signs = [1, 0, -1];
  const dp = Array.from(Array(W), () => new Set());

  const dfs = (cur, level) => {
    if (level === W) return;

    for (const sign of signs) {
      const next = cur + weights[level] * sign;
      if (dp[level].has(next)) continue;
      if (next > LIMIT) return;

      dp[level].add(next);
      dfs(next, level + 1);
    }
  };

  dfs(0, 0);

  return query
    .map((bead) => (dp.some((values) => values.has(bead)) ? "Y" : "N"))
    .join("\n");
}

const W = Number(input[0]);
const weights = input[1].split(" ").map(Number);
const Q = Number(input[2]);
const query = input[3].split(" ").map(Number);
console.log(solution(W, Q, weights, query));
