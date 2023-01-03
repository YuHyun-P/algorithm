const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N) {
  const queue = Array.from(Array(N), (_, index) => index + 1);
  let head = 0;
  while (queue.length - head > 1) {
    head += 1;
    queue.push(queue[head]);
    head += 1;
  }
  return queue[head];
}

const N = Number(input[0].trim());

console.log(solution(N));
