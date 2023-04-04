const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, cost) {
  const RGB = [0, 1, 2];
  const [R, G, B] = RGB;

  const calcMin = (start) => {
    const dp = cost.map((row) => [...row]);
    for (const rgb of RGB) {
      if (start === rgb) continue;
      dp[0][rgb] = Infinity;
    }
    dp[1][start] = Infinity;
    dp[N - 1][start] = Infinity;

    for (let house = 1; house < N; house++) {
      dp[house][R] += Math.min(dp[house - 1][G], dp[house - 1][B]);
      dp[house][G] += Math.min(dp[house - 1][B], dp[house - 1][R]);
      dp[house][B] += Math.min(dp[house - 1][R], dp[house - 1][G]);
    }

    return Math.min(dp[N - 1][R], dp[N - 1][G], dp[N - 1][B]);
  };

  return Math.min(...RGB.map(calcMin));
}

const N = Number(input.shift());
const cost = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, cost));
