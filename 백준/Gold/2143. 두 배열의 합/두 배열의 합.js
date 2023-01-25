const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, n, A, m, B) {
  const subA = getSortedSub(A);
  const subB = getSortedSub(B);
  let count = 0;

  for (const a of subA) {
    const ub = upperBound(T - a, subB);
    const lb = lowerBound(T - a, subB);
    count += ub - lb;
  }

  return count;
}

function getSortedSub(array) {
  const sub = [];
  for (let i = 0; i < array.length; i++) {
    let sum = 0;
    for (let j = i; j < array.length; j++) {
      sum += array[j];
      sub.push(sum);
    }
  }
  sub.sort((a, b) => a - b);
  return sub;
}

function lowerBound(target, array) {
  let left = -1;
  let right = array.length;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return right;
}
function upperBound(target, array) {
  let left = -1;
  let right = array.length;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] <= target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return right;
}

const T = Number(input[0].trim());
const n = Number(input[1].trim());
const A = input[2].trim().split(" ").map(Number);
const m = Number(input[3].trim());
const B = input[4].trim().split(" ").map(Number);
console.log(solution(T, n, A, m, B));
