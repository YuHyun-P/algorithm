const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(A, B) {
  const A_LENGTH = A.length;
  const B_LENGTH = B.length;

  const dp = Array.from(Array(A_LENGTH), () => Array(B_LENGTH).fill(0));
  const outOfBound = (a, b) => a < 0 || b < 0 || A_LENGTH <= a || B_LENGTH <= b;
  const safetyGet = (a, b) => (outOfBound(a, b) ? 0 : dp[a][b]);
  for (let a = 0; a < A_LENGTH; a++) {
    const curA = A[a];

    for (let b = 0; b < B_LENGTH; b++) {
      const curB = B[b];
      dp[a][b] = Math.max(
        safetyGet(a - 1, b),
        safetyGet(a, b - 1),
        safetyGet(a - 1, b - 1) + (curA === curB ? 1 : 0)
      );
    }
  }

  return dp[A_LENGTH - 1][B_LENGTH - 1];
}

const A = input[0].trim();
const B = input[1].trim();
console.log(solution(A, B));
