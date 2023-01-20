const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, liquid) {
  let min = Infinity;

  for (let i = 0; i < N - 1; i++) {
    const j = lowerBound(i + 1, N - 1, -liquid[i], liquid);

    for (const dJ of [-1, 0, 1]) {
      const adjacentJ = j + dJ;
      if (
        adjacentJ !== i &&
        adjacentJ < N &&
        Math.abs(liquid[i] + liquid[adjacentJ]) < Math.abs(min)
      ) {
        min = liquid[i] + liquid[adjacentJ];
      }
    }
  }

  return min;
}

function lowerBound(left, right, target, array) {
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    }
    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

const N = Number(input[0].trim());
const liquid = input[1].trim().split(" ").map(Number);
console.log(solution(N, liquid));
