const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, number) {
  const stack = [];
  const isEmpty = () => stack.length === 0;
  for (let cur = 0; cur < N; cur++) {
    while (!isEmpty() && K > 0 && stack.at(-1) < number[cur]) {
      stack.pop();
      K -= 1;
    }
    stack.push(number[cur]);
  }
  while (K > 0) {
    stack.pop();
    K -= 1;
  }
  return stack.join("");
}

const [N, K] = input[0].split(" ").map(Number);
const number = input[1];
console.log(solution(N, K, number));
