const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, N, multiverse) {
  const SIZE = 0;
  const INDEX = 1;
  const parent = Array.from(Array(M), (_, i) => i);
  const sorted = multiverse.map((row) =>
    row
      .trim()
      .split(" ")
      .map((char, index) => [Number(char), index])
      .sort((a, b) => a[SIZE] - b[SIZE])
  );
  let pair = 0;

  const upperBound = (left, right, universe, target) => {
    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      if (universe[mid][SIZE] <= target) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }

    return left;
  };
  const isSame = (universeA, universeB) => {
    let cur = 0;
    while (cur < N) {
      if (universeA[cur][INDEX] !== universeB[cur][INDEX]) {
        return false;
      }

      if (
        universeA[cur + 1] &&
        universeA[cur][SIZE] === universeA[cur + 1][SIZE]
      ) {
        const nextA = upperBound(cur, N, universeA, universeA[cur][SIZE]);
        const nextB = upperBound(cur, N, universeB, universeB[cur][SIZE]);

        if (nextA !== nextB) {
          return false;
        }

        cur = nextA + 1;
      } else {
        cur += 1;
      }
    }

    return true;
  };

  for (let i = 0; i < M; i++) {
    for (let j = i + 1; j < M; j++) {
      if (parent[i] === parent[j]) {
        pair += 1;
        continue;
      }

      if (parent[i] !== i || parent[j] !== j || !isSame(sorted[i], sorted[j])) {
        continue;
      }

      pair += 1;
      parent[j] = parent[i];
    }
  }

  return pair;
}

const [M, N] = input.shift().trim().split(" ").map(Number);
console.log(solution(M, N, input));
