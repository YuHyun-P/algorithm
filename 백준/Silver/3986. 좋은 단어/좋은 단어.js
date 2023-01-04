const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const isGoodWord = (word) => {
    const stack = [];
    for (const char of word) {
      if (stack.at(-1) === char) {
        stack.pop();
        continue;
      }

      stack.push(char);
    }
    return stack.length === 0;
  };
  return testCase.map(isGoodWord).filter((result) => result).length;
}

const T = Number(input.shift());
const testCase = input.map((row) => row.trim());
console.log(solution(testCase));
