const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);
const A = input[1].trim().split(" ").map(Number);

const prefixSum = [0];
const modularCount = Array(M).fill(0);
modularCount[0]++;

for (let index = 0; index < A.length; index++) {
  const modular = (prefixSum[index] + A[index]) % M;
  prefixSum[index + 1] = modular;
  modularCount[modular]++;
}

console.log(
  modularCount
    .map((count) => (count * (count - 1)) / 2)
    .reduce((acc, cur) => acc + cur, 0)
);
