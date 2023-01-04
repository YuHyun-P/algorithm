const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, sequence) {
  sequence.sort((a, b) => a - b);
  let right = 0;
  let minDiff = Infinity;
  for (let left = 0; left < sequence.length; left++) {
    while (
      Math.sign(sequence[right] - sequence[left] - M) < 0 &&
      right < sequence.length
    ) {
      right += 1;
    }

    const diff = Math.sign((sequence[right] ?? 0) - sequence[left] - M);
    if (diff < 0) {
      break;
    }
    if (diff === 0) {
      minDiff = M;
      break;
    }

    minDiff = Math.min(minDiff, sequence[right] - sequence[left]);
  }

  return minDiff;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const sequence = input.flatMap((row) => Number(row.trim()));
console.log(solution(M, sequence));
