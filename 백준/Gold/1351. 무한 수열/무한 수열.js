const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution([N, P, Q]) {
  const A = new Map([[0, 1]]);

  const recur = (N) => {
    if (A.has(N)) {
      return A.get(N);
    }

    const left = recur(Math.floor(N / P));
    const right = recur(Math.floor(N / Q));
    A.set(N, left + right);
    return left + right;
  };

  return recur(N);
}

console.log(solution(input.map(Number)));
