const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, X, Y, errors) {
  let end = 0;
  let minFixed = M;

  const calcContinuous = (start, end) => {
    const startLine = errors[start - 1] ?? 0;
    const endLine = errors[end + 1] ?? N + 1;
    return endLine - startLine - 1;
  };

  for (let start = 0; start < M; start++) {
    while (end < M && calcContinuous(start, end) < X) {
      end += 1;
    }

    if (calcContinuous(start, end) < X) break;

    const fixed = end - start + 1;
    minFixed = Math.min(minFixed, fixed);
    if (fixed <= Y) break;
  }

  return M - Math.max(minFixed, Y);
}

const [N, M] = input[0].trim().split(" ").map(Number);
const errors = input[1].trim().split(" ").map(Number);
const [X, Y] = input[2].trim().split(" ").map(Number);
console.log(solution(N, M, X, Y, errors));
