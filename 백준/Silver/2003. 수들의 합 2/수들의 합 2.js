const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, A) {
  let count = 0;
  let start = 0;
  let end = 1;
  let subTotal = A[start];

  while (start < N && end <= N) {
    if (subTotal === M) count += 1;
    if (subTotal >= M) subTotal -= A[start++];
    else subTotal += A[end++] ?? 0;
  }

  return count;
}

const [N, M] = input[0].trim().split(" ").map(Number);
const A = input[1].trim().split(" ").map(Number);
console.log(solution(N, M, A));
