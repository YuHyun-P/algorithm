const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim();

function solution(N) {
  const count = Array(10).fill(0);
  for (const char of String(N)) {
    count[Number(char)] += 1;
  }
  count[6] = count[9] = Math.ceil((count[6] + count[9]) / 2);
  return Math.max(...count);
}

const N = Number(input);
console.log(solution(N));
