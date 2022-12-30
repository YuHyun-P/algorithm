const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(sequence) {
  const nge = Array(sequence.length).fill(-1);
  const rest = [];

  for (let cur = sequence.length - 1; 0 <= cur; cur--) {
    while (rest.length) {
      const prev = rest.pop();
      if (sequence[cur] < sequence[prev]) {
        rest.push(prev);
        nge[cur] = sequence[prev];
        break;
      }
    }
    rest.push(cur);
  }

  return nge;
}

input.shift();
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(sequence).join(" "));
