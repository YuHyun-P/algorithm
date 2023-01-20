const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, A) {
  const [coding, student] = init(N, A);
  let team = 0;

  for (let i = 0; i < coding.length; i++) {
    for (let j = i; j < coding.length; j++) {
      const codingK = (coding[i] + coding[j]) * -1;
      const k = binarySearch(codingK, coding);
      if (k < 0) {
        continue;
      }
      if (k < j) {
        break;
      }

      const choice = new Map();
      let count = 1;
      for (const index of [i, j, k]) {
        choice.set(index, (choice.get(index) ?? 0) + 1);
      }
      for (const [index, r] of choice.entries()) {
        count *= combination(student[index].length, r);
      }
      team += count;
    }
  }

  return team;
}

function init(N, A) {
  const coding = [];
  const student = [];

  A.sort((a, b) => a - b);
  for (let i = 0; i < N; i++) {
    if (coding.at(-1) === A[i]) {
      student.at(-1).push(i);
      continue;
    }

    coding.push(A[i]);
    student.push([i]);
  }

  return [coding, student];
}

function binarySearch(target, array) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    }
    if (array[mid] < target) {
      left = mid + 1;
    }
    if (array[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
}

function combination(n, r) {
  if (n < r) {
    return 0;
  }
  if (n === r) {
    return 1;
  }

  let answer = 1;
  for (let k = 0; k < r; k++) {
    answer *= n - k;
  }
  for (let k = 0; k < r; k++) {
    answer /= k + 1;
  }

  return answer;
}

const N = Number(input[0].trim());
const A = input[1].trim().split(" ").map(Number);
console.log(solution(N, A));
