const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, tree, P, trail) {
  const xMap = new Map();
  const yMap = new Map();
  for (const row of tree) {
    const [x, y] = row.trim().split(" ").map(Number);
    if (xMap.has(x)) xMap.get(x).push(y);
    else xMap.set(x, [y]);
    if (yMap.has(y)) yMap.get(y).push(x);
    else yMap.set(y, [x]);
  }

  for (const x of xMap.keys()) {
    xMap.get(x).sort((a, b) => a - b);
  }

  for (const y of yMap.keys()) {
    yMap.get(y).sort((a, b) => a - b);
  }

  const calc = ([x1, y1, x2, y2]) => {
    let count = 0;

    // x = x1, y1 <= y <= y2
    count += upperBound(y2, xMap.get(x1)) - lowerBound(y1, xMap.get(x1));

    // x = x2, y1 <= y <= y2
    count += upperBound(y2, xMap.get(x2)) - lowerBound(y1, xMap.get(x2));

    if (x1 + 1 < x2) {
      // x1 < x < x2, y = y1 | y2
      count +=
        upperBound(x2 - 1, yMap.get(y1)) - lowerBound(x1 + 1, yMap.get(y1));
      count +=
        upperBound(x2 - 1, yMap.get(y2)) - lowerBound(x1 + 1, yMap.get(y2));
    }

    return count;
  };

  return trail.map((row) => calc(row.trim().split(" ").map(Number))).join("\n");
}

function lowerBound(target, array = []) {
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
function upperBound(target, array = []) {
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

const N = Number(input.shift().trim());
const tree = input.splice(0, N);
const P = Number(input.shift().trim());
console.log(solution(N, tree, P, input));
