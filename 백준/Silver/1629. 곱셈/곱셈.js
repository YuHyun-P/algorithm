const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";

const [A, B, C] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);

function solution(A, B, C) {
  if (B === 1n) {
    return A % C;
  }

  if (B % 2n === 0n) {
    const halfRest = solution(A, B / 2n, C);
    return (halfRest * halfRest) % C;
  } else {
    return (solution(A, B - 1n, C) * A) % C;
  }
}
console.log(Number(solution(A, B, C)));
