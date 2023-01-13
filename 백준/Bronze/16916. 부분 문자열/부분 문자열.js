const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(S, P) {
  const failureTable = failure(P);

  let p = 0;
  for (let s = 0; s < S.length; s++) {
    while (0 < p && S[s] !== P[p]) {
      p = failureTable[p - 1];
    }

    if (S[s] === P[p]) {
      p += 1;
      if (p === P.length) {
        return 1;
      }
    }
  }

  return 0;
}

function failure(P) {
  const failureTable = Array(P.length).fill(0);
  let prefix = 0;
  for (let suffix = 1; suffix < failureTable.length; suffix++) {
    while (0 < prefix && P[prefix] !== P[suffix]) {
      prefix = failureTable[prefix - 1];
    }
    if (P[prefix] === P[suffix]) {
      failureTable[suffix] = prefix + 1;
      prefix += 1;
    }
  }

  return failureTable;
}

const [S, P] = input.map((word) => word.trim());
console.log(solution(S, P));
