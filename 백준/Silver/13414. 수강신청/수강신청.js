const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(K, L, id) {
  const ORDER = 1;
  const register = new Map();
  for (let i = 0; i < L; i++) {
    register.set(id[i], i);
  }
  const sorted = [...register].sort((a, b) => a[ORDER] - b[ORDER]);
  return sorted
    .slice(0, K)
    .map(([id]) => id)
    .join("\n");
}

const [K, L] = input.shift().trim().split(" ").map(Number);
console.log(solution(K, L, input));
