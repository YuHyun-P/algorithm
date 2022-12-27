const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N) {
  let arrangementCount = 0;
  const visitedCol = Array(N).fill(false);
  const negativeGradientIntercept = Array(N * 2 - 1).fill(false);
  const positiveGradientIntercept = Array(N * 2 - 1).fill(false);

  const backtracking = (queenCount) => {
    if (queenCount === 0) {
      arrangementCount += 1;
      return;
    }

    const row = N - queenCount;
    visitedCol.forEach((selected, index) => {
      const col = index + 1;
      if (
        selected ||
        negativeGradientIntercept[col + row] ||
        positiveGradientIntercept[col - row + N]
      ) {
        return;
      }

      visitedCol[index] = true;
      negativeGradientIntercept[col + row] = true;
      positiveGradientIntercept[col - row + N] = true;

      backtracking(queenCount - 1);

      visitedCol[index] = false;
      negativeGradientIntercept[col + row] = false;
      positiveGradientIntercept[col - row + N] = false;
    });
  };

  backtracking(N);
  return arrangementCount;
}

const N = Number(input);
console.log(solution(N));
