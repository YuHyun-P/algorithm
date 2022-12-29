const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const ascending = (a, b) => a - b;
  const test = ([groupA, groupB]) => {
    const count = Array(groupA.length).fill(0);
    let bIndex = 0;

    groupA.sort(ascending);
    groupB.sort(ascending);

    groupA.forEach((a, index) => {
      while (bIndex < groupB.length) {
        if (a <= groupB[bIndex]) {
          break;
        }

        bIndex += 1;
      }

      count[index] = bIndex;
    });

    return count.reduce((acc, cur) => acc + cur, 0);
  };

  return testCase.map(test);
}

const T = Number(input.shift().trim());
const testCase = (() => {
  const testCase = [];
  for (let t = 0; t < T; t++) {
    const [AB, groupA, groupB] = input
      .splice(0, 3)
      .map((row) => row.trim().split(" ").map(Number));
    testCase.push([groupA, groupB]);
  }
  return testCase;
})();
console.log(solution(testCase).join("\n"));
