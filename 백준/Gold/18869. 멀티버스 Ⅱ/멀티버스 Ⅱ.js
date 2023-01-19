const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, N, multiverse) {
  const compress = (universe) => [...new Set(universe)].sort((a, b) => a - b);
  const binarySearch = (universe, target) => {
    let left = 0;
    let right = universe.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (universe[mid] === target) {
        return mid;
      }
      if (universe[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return left;
  };

  const compressed = multiverse.map((row) => {
    const universe = row.trim().split(" ").map(Number);
    const unique = compress(universe);
    return universe.map((size) => binarySearch(unique, size));
  });
  let pair = 0;

  const isSame = (universeA, universeB) => {
    for (let i = 0; i < N; i++) {
      if (universeA[i] !== universeB[i]) {
        return false;
      }
    }

    return true;
  };

  for (let i = 0; i < M; i++) {
    for (let j = i + 1; j < M; j++) {
      if (isSame(compressed[i], compressed[j])) {
        pair += 1;
      }
    }
  }

  return pair;
}

const [M, N] = input.shift().trim().split(" ").map(Number);
console.log(solution(M, N, input));

// reference https://github.com/encrypted-def/basic-algo-lecture/blob/master/0x13/solutions/18869.cpp
