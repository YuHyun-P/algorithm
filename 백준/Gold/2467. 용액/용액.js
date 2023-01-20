const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, pH) {
  const min = [0, 1];
  const mix = (i, j) => Math.abs(pH[i] + pH[j]);
  const updateMin = (i, j) => {
    min[0] = i;
    min[1] = j;
  };

  const lowerBound = (src) => {
    let left = 0;
    let right = N - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (-pH[src] === pH[mid]) {
        return mid;
      }
      if (-pH[src] < pH[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };

  for (let i = 0; i < N - 1; i++) {
    const j = lowerBound(i);

    for (const dJ of [-1, 0, 1]) {
      if (j + dJ !== i && pH[j - 1] && mix(i, j + dJ) < mix(...min)) {
        updateMin(i, j + dJ);
      }
    }
  }

  return min
    .map((i) => pH[i])
    .sort((a, b) => a - b)
    .join(" ");
}

const N = Number(input[0].trim());
const pH = input[1].trim().split(" ").map(Number);
console.log(solution(N, pH));
