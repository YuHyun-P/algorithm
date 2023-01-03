const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, line) {
  line.sort((a, b) => a - b);
  let max = line.at(-1);

  let left = 1;
  let right = max;
  while (left < right) {
    let mid = Math.floor((left + right + 1) / 2);
    const k = line
      .map((length) => Math.floor(length / mid))
      .reduce((acc, cur) => acc + BigInt(cur), 0n);

    if (k < BigInt(K)) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }

  return left;
}

const [N, K] = input.shift().trim().split(" ").map(Number);
const line = input.flatMap((row) => Number(row.trim()));
console.log(solution(N, K, line));
