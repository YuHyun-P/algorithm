const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, N, L) {
  const divide = (length) => {
    let count = 0;
    for (const l of L) {
      count += Math.floor(l / length);
    }
    return count;
  };

  const binarySearch = (left, right) => {
    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      const divided = divide(mid);
      if (divided < M) {
        right = mid - 1;
      } else {
        left = mid;
      }
    }

    return left;
  };

  return binarySearch(0, Math.max(...L));
}

const [M, N] = input[0].trim().split(" ").map(Number);
const L = input[1].trim().split(" ").map(Number);
console.log(solution(M, N, L));
