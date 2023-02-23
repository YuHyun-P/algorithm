const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, budgets, limit) {
  const compare = (cur) => {
    let total = 0;
    for (const budget of budgets) {
      total += Math.min(cur, budget);
      if (total > limit) break;
    }

    return total - limit;
  };

  const upperBound = (left, right) => {
    while (left < right - 1) {
      const mid = Math.floor((left + right) / 2);
      if (compare(mid) <= 0) {
        left = mid;
      } else {
        right = mid;
      }
    }
    return left;
  };

  return Math.min(upperBound(0, limit + 1), Math.max(...budgets));
}

const N = Number(input[0].trim());
const budgets = input[1].trim().split(" ").map(Number);
const limit = Number(input[2].trim());
console.log(solution(N, budgets, limit));
