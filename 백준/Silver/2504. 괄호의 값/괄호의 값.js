const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim();

function solution(input) {
  const stack = [];
  const rightMap = new Map([
    [")", { left: "(", value: 2 }],
    ["]", { left: "[", value: 3 }],
  ]);
  let isValid = true;

  for (let index = 0; index < input.length && isValid; index++) {
    const char = input[index];

    switch (char) {
      case "(":
      case "[":
        stack.push(char);
        break;
      case ")":
      case "]":
        let sum = 0;
        while (stack.length && isValid) {
          const prev = stack.pop();

          if (rightMap.get(char).left === prev) {
            stack.push(rightMap.get(char).value * (sum === 0 ? 1 : sum));
            break;
          }

          if (typeof prev === "number") {
            sum += prev;
            continue;
          }

          isValid = false;
        }

        if (!stack.length) {
          isValid = false;
        }
        break;
      default:
        isValid = false;
    }
  }

  return isValid && stack.every(Number.isInteger)
    ? stack.reduce((acc, cur) => acc + cur, 0)
    : 0;
}

console.log(solution(input));
