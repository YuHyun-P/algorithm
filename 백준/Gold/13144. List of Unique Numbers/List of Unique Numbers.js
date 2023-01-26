const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, sequence) {
  const MAX = 100000;
  const selected = Array(MAX + 1).fill(0);
  let count = 0;
  let start = 0;
  let end = 0;

  while (start < N && end < N) {
    if (selected[sequence[end]] === 0) {
      selected[sequence[end++]] += 1;
      count += end - start;
    } else {
      selected[sequence[start++]] -= 1;
    }
  }

  return count;
}

const N = Number(input[0].trim());
const sequence = input[1].trim().split(" ").map(Number);
console.log(solution(N, sequence));
