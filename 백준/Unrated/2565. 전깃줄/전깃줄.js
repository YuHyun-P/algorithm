const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, lines) {
  const [LEFT, RIGHT] = [0, 1];
  const maxLength = Array(n).fill(1);
  lines.sort((a, b) => a[LEFT] - b[LEFT]);

  for (let until = 1; until < n; until++) {
    for (let prev = 0; prev < until; prev++) {
      if (lines[until][RIGHT] < lines[prev][RIGHT]) continue;
      maxLength[until] = Math.max(maxLength[until], maxLength[prev] + 1);
    }
  }

  return n - Math.max(...maxLength);
}

const n = Number(input.shift().trim());
const lines = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(n, lines));
