const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].trim().split(" ").map(Number);
const temperatureArray = input[1].trim().split(" ").map(Number);

const prefixSum = [0];
temperatureArray.forEach((temperature) =>
  prefixSum.push(temperature + prefixSum.at(-1))
);

const prefixK = [];
for (let day = 0; day <= temperatureArray.length - K; day++) {
  prefixK.push(prefixSum[day + K] - prefixSum[day]);
}

console.log(Math.max(...prefixK));
