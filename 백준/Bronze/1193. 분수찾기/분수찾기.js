const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N) {
  let h = 1;
  while (N > h) {
    N -= h;
    h += 1;
  }
  return h % 2 === 0 ? `${N}/${h + 1 - N}` : `${h + 1 - N}/${N}`;
}

console.log(solution(Number(input[0].trim())));
