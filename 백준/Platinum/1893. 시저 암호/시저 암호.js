const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().split("\n");

function solution(A, W, S) {
  let x = 0;
  const failureTable = failure(W);
  const answer = [];
  const WArray = [...W];
  const order = new Map([...A].map((char, i) => [char, i]));

  while (x < A.length) {
    const shiftW = WArray.map((char) => A[(order.get(char) + x) % A.length]);
    let count = 0;

    let w = 0;
    for (let s = 0; s < S.length && count < 2; s++) {
      while (0 < w && S[s] !== shiftW[w]) w = failureTable[w - 1];
      if (S[s] === shiftW[w]) w += 1;
      if (w === W.length) {
        count += 1;
        w = failureTable[w - 1];
      }
    }

    if (count === 1) answer.push(x);
    x += 1;
  }

  switch (answer.length) {
    case 0:
      return "no solution";
    case 1:
      return `unique: ${answer[0]}`;
    default:
      return `ambiguous: ${answer.join(" ")}`;
  }
}

function failure(pattern) {
  const failureTable = Array(pattern.length).fill(0);
  let prefix = 0;
  for (let suffix = 1; suffix < pattern.length; suffix++) {
    while (0 < prefix && pattern[prefix] !== pattern[suffix]) {
      prefix = failureTable[prefix - 1];
    }
    if (pattern[prefix] === pattern[suffix]) {
      failureTable[suffix] = prefix + 1;
      prefix += 1;
    }
  }
  return failureTable;
}

let cursor = 0;
const T = Number(input[cursor++]);

for (let tc = 0; tc < T; tc++) {
  const A = input[cursor++].trimEnd("\n");
  const W = input[cursor++].trimEnd("\n");
  const S = input[cursor++].trimEnd("\n");
  console.log(solution(A, W, S));
}
