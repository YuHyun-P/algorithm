const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = Number(input[0]);
const questions = (() => {
  const temp = [];
  for (let line = 1; line < 1 + T; line++) {
    temp.push(Number(input[line]));
  }
  return temp;
})();

const fibonacci = (() => {
  const fibonacciCountDp = [];

  const fibonacciCount = (num) => {
    if (fibonacciCountDp[num]) {
      return [...fibonacciCountDp[num]];
    }

    if (num === 0) {
      return [1, 0];
    }

    if (num === 1) {
      return [0, 1];
    }

    const [zeroLeft, oneLeft] = fibonacciCount(num - 1);
    const [zeroRight, oneRight] = fibonacciCount(num - 2);
    const result = [zeroLeft + zeroRight, oneLeft + oneRight];

    if (fibonacciCountDp[num] === undefined) {
      fibonacciCountDp[num] = [...result];
    }

    return [...result];
  };

  const count = (N) => fibonacciCount(N);

  return { count };
})();

console.log(questions.map((N) => fibonacci.count(N).join(" ")).join("\n"));
