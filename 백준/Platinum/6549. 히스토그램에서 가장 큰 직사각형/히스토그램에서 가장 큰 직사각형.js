const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const getMax = (height) => {
    let max = 0;
    const history = [];
    [...height, 0].forEach((curHeight) => {
      let curWidth = 1;

      while (history.length) {
        const [prevHeight, prevWidth] = history.pop();

        if (prevHeight > curHeight) {
          curWidth += prevWidth;
          max = Math.max(max, prevHeight * (curWidth - 1));
          continue;
        }

        if (prevHeight === curHeight) {
          curWidth += prevWidth;
          continue;
        }

        if (prevHeight < curHeight) {
          history.push([prevHeight, prevWidth]);
          break;
        }
      }

      history.push([curHeight, curWidth]);
    });

    return max;
  };

  return testCase.map(getMax);
}

input.pop();
const testCase = input.map((row) => {
  const [n, ...height] = row.trim().split(" ").map(Number);
  return height;
});
console.log(solution(testCase).join("\n"));
