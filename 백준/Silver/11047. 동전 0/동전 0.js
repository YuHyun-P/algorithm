const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].trim().split(" ").map(Number);
let rest = K;
let totalCount = 0;

const coins = [];
for (let line = 1; line < 1 + N; line++) {
  const coin = Number(input[line].trim());
  if (coin > K) break;

  coins.push(coin);
}

for (let index = coins.length - 1; index >= 0; index--) {
  if (rest === 0) break;
  const coin = coins[index];
  const count = Math.floor(rest / coin);
  rest -= count * coin;
  totalCount += count;
}

console.log(totalCount);
