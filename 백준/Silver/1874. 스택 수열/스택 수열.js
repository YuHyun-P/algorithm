const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].trim());
const target = (() => {
  const temp = [];
  for (let line = 1; line < 1 + N; line++) {
    temp.push(Number(input[line].trim()));
  }
  return temp;
})();

let answer = "";
let targetIndex = 0;
const stack = [];

for (let curNum = 1; curNum <= N; curNum++) {
  const targetNum = target[targetIndex];

  if (targetNum >= curNum) {
    stack.push(curNum);
    answer += "\n" + "+";
  }

  if (targetNum < curNum) {
    const latest = stack.pop();
    answer += "\n" + "-";

    if (latest === undefined || latest !== targetNum) {
      answer = "NO";
      break;
    }

    targetIndex++;
    curNum--;
  }
}

while (stack.length) {
  const stackNum = stack.pop();
  const targetNum = target[targetIndex];

  if (targetNum !== stackNum) {
    answer = "NO";
    break;
  }

  answer += "\n" + "-";
  targetIndex++;
}

console.log(targetIndex === N ? answer.trim() : "NO");
