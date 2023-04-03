const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, weights) {
  const START = 0;
  const dp = Array.from(Array(N), () => Array(1 << N).fill(-1));

  const dfs = (city, visited) => {
    if (visited === (1 << N) - 1) {
      return weights[city][START] !== 0 ? weights[city][START] : Infinity;
    }
    if (dp[city][visited] !== -1) return dp[city][visited];

    let tmp = Infinity;
    for (let next = 0; next < N; next++) {
      if ((visited & (1 << next)) !== 0) continue;
      if (weights[city][next] === 0) continue;

      tmp = Math.min(
        tmp,
        dfs(next, visited | (1 << next)) + weights[city][next]
      );
    }

    dp[city][visited] = tmp;
    return tmp;
  };

  return dfs(START, 1);
}

const N = Number(input.shift());
const weights = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, weights));
