const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, sequence) {
  const MAX = 100000;
  const selected = Array(MAX + 1).fill(0);
  let end = 0;
  let maxLength = 0;

  for (let start = 0; start < N; start++) {
    while (end < N && selected[sequence[end]] < K) {
      selected[sequence[end]] += 1;
      end += 1;
    }

    maxLength = Math.max(maxLength, end - start);
    selected[sequence[start]] -= 1;
  }

  return maxLength;
}

const [N, K] = input[0].trim().split(" ").map(Number);
const sequence = input[1].trim().split(" ").map(Number);
console.log(solution(N, K, sequence));
