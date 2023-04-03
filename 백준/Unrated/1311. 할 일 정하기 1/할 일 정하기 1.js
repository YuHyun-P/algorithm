const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, D) {
  const dp = Array.from(Array(N), () => Array((1 << N) - 1).fill(Infinity));
  const dfs = (people, visited) => {
    if (people === N) return 0;
    if (dp[people][visited] !== Infinity) return dp[people][visited];

    let tmp = Infinity;
    for (let i = 0; i < N; i++) {
      if (visited & (1 << i)) continue;
      tmp = Math.min(tmp, dfs(people + 1, visited | (1 << i)) + D[people][i]);
    }
    dp[people][visited] = tmp;

    return tmp;
  };

  return dfs(0, 0);
}

const N = Number(input.shift());
const D = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, D));
