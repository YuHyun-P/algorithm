const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, meeting) {
  const max = Array(n + 1).fill(0);
  let totalMax = 0;

  for (let index = n - 1; 0 <= index; index--) {
    const [t, p] = meeting[index].trim().split(" ").map(Number);
    max[index] = max[index + 1];

    if (index + t < n + 1 && max[index] < max[index + t] + p) {
      max[index] = max[index + t] + p;
    }

    if (totalMax < max[index]) {
      totalMax = max[index];
    }
  }

  return totalMax;
}

const n = Number(input.shift().trim());
console.log(solution(n, input));
