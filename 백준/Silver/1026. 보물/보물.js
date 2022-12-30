const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(A, B) {
  const ascending = (a, b) => a - b;
  const descending = (a, b) => b - a;
  A.sort(ascending);
  B.sort(descending);

  return A.reduce((acc, cur, index) => acc + cur * B[index], 0);
}

input.shift();
const [A, B] = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(A, B));
