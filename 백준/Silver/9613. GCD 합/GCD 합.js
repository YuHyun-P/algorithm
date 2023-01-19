const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(query) {
  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  const sumAllGcd = (query) => {
    const [n, ...num] = query;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        sum += gcd(num[i], num[j]);
      }
    }
    return sum;
  };

  return query.map(sumAllGcd).join("\n");
}

input.shift();
const query = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(query));
