const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(S, sequence) {
  let right = 0;
  let sum = sequence[right];
  let min = Infinity;
  for (let left = 0; left < sequence.length; left++) {
    while (sum < S && right < sequence.length) {
      right += 1;
      if (right !== sequence.length) {
        sum += sequence[right];
      }
    }
    if (right === sequence.length) {
      break;
    }

    min = Math.min(min, right - left + 1);
    sum -= sequence[left];
  }
  return min !== Infinity ? min : 0;
}

const [N, S] = input.shift().trim().split(" ").map(Number);
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(S, sequence));
