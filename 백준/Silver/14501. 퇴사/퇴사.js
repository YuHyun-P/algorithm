const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, meeting) {
  const max = Array(N + 1).fill(0);

  for (let index = N - 1; 0 <= index; index--) {
    const [t, p] = meeting[index];
    if (t + index < N + 1) {
      max[index] = Math.max(max[index + 1], (max[t + index] ?? 0) + p);
    } else {
      max[index] = max[index + 1];
    }
  }

  return Math.max(...max);
}

const N = Number(input.shift().trim());
const meeting = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, meeting));

// reference https://github.com/encrypted-def/basic-algo-lecture/blob/master/0x10/solutions/14501.cpp