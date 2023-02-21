const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, ballon) {
  let max = 0;
  const gradient = new Map();

  ballon.forEach((row) => {
    const [x, y] = row.trim().split(" ").map(Number);
    const key = `${Math.sign(x)} ${Math.sign(y)} ${x / y}`;
    gradient.set(key, (gradient.get(key) ?? 0) + 1);
    max = Math.max(max, gradient.get(key));
  });

  return max;
}

const N = Number(input.shift());
console.log(solution(N, input));
