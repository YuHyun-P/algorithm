const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(M, N) {
  let answer = "";
  const isPrime = Array(N + 1).fill(true);
  isPrime[1] = false;

  for (let num = 2; num < isPrime.length; num++) {
    for (let composite = num; composite * num < isPrime.length; composite++) {
      isPrime[composite * num] = false;
    }
  }

  isPrime.forEach((result, num) => {
    if (num < M || !result) {
      return;
    }
    answer += `${num} `;
  });

  return answer.trim();
}

const [M, N] = input.map(Number);
console.log(solution(M, N));
