const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N) {
  if (N === 1) {
    return [];
  }

  const primes = [];
  let cur = N;

  for (let num = 2; num <= cur; num++) {
    if (cur % num === 0) {
      primes.push(num);
      cur /= num;
      num -= 1;
    }
  }
  return primes;
}

const N = Number(input[0]);
console.log(solution(N).join("\n"));
