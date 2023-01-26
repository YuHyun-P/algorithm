const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, sequence) {
  const prefixSum = [0];
  for (const num of sequence) {
    prefixSum.push(prefixSum.at(-1) + (num % 2 === 1 ? 1 : 0));
  }
  let maxLength = 0;
  let start = 1;
  let end = 1;

  while (end < prefixSum.length) {
    const deleted = prefixSum[end] - prefixSum[start - 1];
    if (deleted <= K) {
      maxLength = Math.max(maxLength, end - start + 1 - deleted);
      end += 1;
    } else {
      start += 1;
    }
  }

  return maxLength;
}

const [N, K] = input[0].trim().split(" ").map(Number);
const sequence = input[1].trim().split(" ").map(Number);
console.log(solution(N, K, sequence));
