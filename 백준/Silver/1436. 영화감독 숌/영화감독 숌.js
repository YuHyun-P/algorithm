const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const N = Number(input);
let num = 666;
let count = 1;

while (count < N) {
  num++;
  if (num.toString().includes("666")) {
    count++;
  }
}

console.log(num);
