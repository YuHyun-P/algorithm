const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N) {
  const prime = getPrimeList(N);
  let start = 0;
  let end = -1;
  let count = 0;
  let subTotal = 0;

  while (end < prime.length && start < prime.length) {
    const diff = Math.sign(subTotal - N);
    switch (diff) {
      case 1:
        subTotal -= prime[start++];
        break;
      case 0:
        count += 1;
        subTotal -= prime[start++];
        break;
      case -1:
        subTotal += prime[++end];
        break;
    }
  }

  return count;
}

function getPrimeList(N) {
  const prime = [];
  const visited = Array(N + 1).fill(false);
  for (let i = 2; i <= N; i++) {
    if (!visited[i]) {
      prime.push(i);
    }
    for (let j = i; i * j <= N; j++) {
      visited[i * j] = true;
    }
  }
  return prime;
}

console.log(solution(Number(input[0])));
