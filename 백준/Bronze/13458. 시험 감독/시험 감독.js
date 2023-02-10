const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, A, B, C) {
  return A.reduce(
    (acc, cur) => acc + (cur < B ? 1 : Math.ceil((cur - B) / C) + 1),
    0
  );
}

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const [B, C] = input[2].split(" ").map(Number);
console.log(solution(N, A, B, C));
