const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function calcGcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function getLastDenominator(a, b) {
  while (a > 1) {
    const unit = Math.max(Math.ceil(b / a), 2);

    a = a * unit - b;
    b *= unit;

    const gcd = calcGcd(b, a);
    a /= gcd;
    b /= gcd;
  }
  return b;
}

const T = Number(input[0].trim());
let answer = "";
for (let tc = 1; tc < T + 1; tc++) {
  answer +=
    getLastDenominator(...input[tc].trim().split(" ").map(Number)) + "\n";
}
console.log(answer.trim());
