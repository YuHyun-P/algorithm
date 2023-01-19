const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, tree) {
  const chopDown = (height) => {
    let count = 0;
    for (const t of tree) {
      count += Math.max(0, t - height);
    }
    return count;
  };

  let left = 0;
  let right = Math.max(...tree);
  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    const total = chopDown(mid);
    if (total < M) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }
  return left;
}

const [N, M] = input[0].trim().split(" ").map(Number);
const tree = input[1].trim().split(" ").map(Number);
console.log(solution(M, tree));
