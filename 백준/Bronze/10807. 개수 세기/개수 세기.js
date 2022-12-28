const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, array, v) {
  const LIMIT = 201;
  const OFFSET = 100;
  const count = Array(LIMIT).fill(0);
  array.forEach((num) => (count[num + OFFSET] += 1));
  return count[v + OFFSET];
}

const [N, sequence, v] = input;
console.log(solution(Number(N), sequence.split(" ").map(Number), Number(v)));
