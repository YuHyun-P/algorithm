const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, number) {
  number.sort((a, b) => a - b);
  const good = new Set();

  for (let i = 0; i < N; i++) {
    if (good.has(number[i])) {
      continue;
    }

    for (let j = 0; j < N; j++) {
      if (j === i) {
        continue;
      }

      const k = binarySearch(j + 1, N - 1, number[i] - number[j], number);
      if (0 <= k && k !== i) {
        good.add(number[i]);
        break;
      }
    }
  }

  return number.filter((num) => good.has(num)).length;
}

function binarySearch(left, right, target, array) {
  while (left <= right) {
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
  return -1;
}

const N = Number(input[0].trim());
const number = input[1].trim().split(" ").map(Number);
console.log(solution(N, number));
