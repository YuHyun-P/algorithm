const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, num) {
  let total = 0;
  let zero = 0;
  const positive = [];
  const negative = [];

  for (const cur of num) {
    if (cur < 0) {
      negative.push(cur);
    }
    if (cur === 0) {
      zero += 1;
    }
    if (cur > 0) {
      positive.push(cur);
    }
  }

  positive.sort((a, b) => a - b);
  negative.sort((a, b) => b - a);

  while (positive.length > 1) {
    const left = positive.pop();
    const right = positive.pop();
    total += Math.max(left * right, left + right);
  }
  total += positive[0] ?? 0;

  while (negative.length > 1) {
    total += negative.pop() * negative.pop();
  }

  return negative.length <= zero ? total : total + negative[0];
}

const [N, ...num] = input.map((row) => Number(row.trim()));
console.log(solution(N, num));
