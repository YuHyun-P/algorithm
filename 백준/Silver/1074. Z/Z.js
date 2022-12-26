const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

const [N, r, c] = input.map(Number);

function solution(N, r, c) {
  if (N === 1) {
    return 2 * r + c;
  }

  const half = 2 ** (N - 1);
  return (
    solution(1, Math.floor(r / half), Math.floor(c / half)) * (half * half) +
    solution(N - 1, r % half, c % half)
  );
}

console.log(solution(N, r, c));
