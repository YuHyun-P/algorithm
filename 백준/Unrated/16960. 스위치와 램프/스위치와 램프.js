const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, ramp) {
  const map = new Map();
  ramp.forEach(([n, ...adjacent]) => {
    adjacent.forEach((index) => {
      map.set(index, (map.get(index) ?? 0) + 1);
    });
  });

  for (const [n, ...adjacent] of ramp) {
    if (adjacent.every((index) => map.get(index) > 1)) return 1;
  }

  return 0;
}

const [N, M] = input.shift().split(" ").map(Number);
const ramp = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, ramp));
