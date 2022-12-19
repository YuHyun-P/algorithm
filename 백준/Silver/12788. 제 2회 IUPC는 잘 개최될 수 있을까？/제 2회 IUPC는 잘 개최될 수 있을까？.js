const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input.shift());
const [M, K] = input.shift().trim().split(" ").map(Number);
const penArray = input[0].trim().split(" ").map(Number);
penArray.sort((a, b) => a - b);

const target = M * K;
let cur = 0;
let ctpMember = 0;

while (cur < target && penArray.length) {
  cur += penArray.pop();
  ctpMember += 1;
}
console.log(cur < target ? "STRESS" : ctpMember);
