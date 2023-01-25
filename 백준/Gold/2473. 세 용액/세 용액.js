const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, pH) {
  const min = [pH[0], pH[1], pH[2]];
  pH.sort((a, b) => a - b);

  const outOfBound = (i) => i < 0 || N <= i;
  const sum = (acc, cur) => acc + cur;
  const updateMin = (i, j, k) => {
    if (Math.abs([i, j, k].reduce(sum, 0)) < Math.abs(min.reduce(sum, 0))) {
      min[0] = i;
      min[1] = j;
      min[2] = k;
    }
  };

  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      const k = lowerBound(-(pH[i] + pH[j]), pH);

      for (const dK of [-1, 0, 1]) {
        if (outOfBound(k + dK) || k + dK === i || k + dK === j) continue;
        updateMin(pH[i], pH[j], pH[k + dK]);
      }
    }
  }

  return min.sort((a, b) => a - b).join(" ");
}

function lowerBound(target, array) {
  let left = -1;
  let right = array.length;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] < target) left = mid;
    else right = mid;
  }
  return right;
}

const N = Number(input[0].trim());
const pH = input[1].trim().split(" ").map(Number);
console.log(solution(N, pH));
