const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const distance = input[1].split(" ").map(Number);
const prefixSum = (() => {
  const prefixSum = [0];
  distance.forEach((d) => prefixSum.push(d + prefixSum.at(-1)));
  return prefixSum;
})();
const costs = input[2]
  .trim()
  .split(" ")
  .map((cost, city) => ({ cost: Number(cost), city }))
  .sort((a, b) => {
    const diffCost = a.cost - b.cost;
    const diffCity = a.city - b.city;

    return diffCost !== 0 ? diffCost : diffCity;
  });

let lastStartCity = N - 1;
console.log(
  costs
    .reduce((acc, { cost, city }) => {
      if (city >= lastStartCity) return acc;

      const totalCost =
        acc + BigInt((prefixSum[lastStartCity] - prefixSum[city]) * cost);
      lastStartCity = city;

      return totalCost;
    }, 0n)
    .toString()
    .replace("n", "")
);
