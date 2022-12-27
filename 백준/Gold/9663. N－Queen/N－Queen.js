const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N) {
  let arrangementCount = 0;
  const visitedCol = Array(N).fill(false);
  const intercept = {
    negativeGradient: new Set(),
    positiveGradient: new Set(),
  };

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
        intercept.negativeGradient.has(col + row) ||
        intercept.positiveGradient.has(col - row)
      ) {
        return;
      }

      visitedCol[index] = true;
      intercept.negativeGradient.add(col + row);
      intercept.positiveGradient.add(col - row);

      backtracking(queenCount - 1);

      visitedCol[index] = false;
      intercept.negativeGradient.delete(col + row);
      intercept.positiveGradient.delete(col - row);
    });
  };

  backtracking(N);
  return arrangementCount;
}

const N = Number(input);
console.log(solution(N));
