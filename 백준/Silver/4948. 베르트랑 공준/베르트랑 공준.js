const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(query) {
  const MAX = 123456 * 2;
  const prime = Array(MAX + 1).fill(-1);
  prime[0] = prime[1] = 0;

  for (let i = 2; i <= MAX; i++) {
    if (prime[i] === -1) {
      prime[i] = 1;
    }

    for (let j = i; i * j <= MAX; j++) {
      if (0 <= prime[i * j]) {
        continue;
      }

      prime[i * j] = 0;
    }
  }

  for (let i = 2; i < MAX + 1; i++) {
    prime[i] += prime[i - 1];
  }

  const countPrime = (n) => prime[2 * n] - prime[n];
  return query.map(countPrime).join("\n");
}

input.pop();
console.log(solution(input));
