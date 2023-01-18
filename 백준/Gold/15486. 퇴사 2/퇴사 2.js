const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, meeting) {
  const max = Array(n + 1).fill(0);
  for (let index = n - 1; 0 <= index; index--) {
    const [t, p] = meeting[index];

    if (index + t < n + 1) {
      max[index] = Math.max(max[index + 1], max[index + t] + p);
    } else {
      max[index] = max[index + 1];
    }
  }

  return Math.max(...max);
}

const n = Number(input.shift().trim());
const meeting = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(n, meeting));
