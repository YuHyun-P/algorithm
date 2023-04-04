const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, set) {
  const MAX_LENGTH = 50;

  const setRest = set.map((num) =>
    [...num].reduce((acc, cur) => (acc * 10 + Number(cur)) % K, 0)
  );
  const tenPowerRest = Array(MAX_LENGTH + 1).fill(0);
  const dp = Array.from(Array(1 << N), () => Array(Number(K)).fill(-1));

  tenPowerRest[0] = 1;
  for (let exp = 1; exp < tenPowerRest.length; exp++) {
    tenPowerRest[exp] = (tenPowerRest[exp - 1] * 10) % K;
  }

  const dfs = (rest, visited) => {
    if (visited === (1 << N) - 1) return rest === 0 ? 1 : 0;
    if (dp[visited][rest] !== -1) return dp[visited][rest];

    let count = 0;
    for (let next = 0; next < N; next++) {
      if (visited & (1 << next)) continue;
      count += dfs(
        (rest * tenPowerRest[set[next].length] + setRest[next]) % K,
        visited | (1 << next)
      );
    }
    dp[visited][rest] = count;

    return dp[visited][rest];
  };
  const factorial = (n) => (n <= 1 ? n : factorial(n - 1) * n);
  const getGcd = (a, b) => (b === 0 ? a : getGcd(b, a % b));

  let dividable = dfs(0, 0);
  let total = factorial(N);
  const gcd = getGcd(dividable, total);

  return [dividable / gcd, total / gcd].join("/");
}

const N = Number(input.shift());
const K = Number(input.pop());
const set = input.map((row) => row.trim());
console.log(solution(N, K, set));
