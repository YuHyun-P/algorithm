const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().split("\n");

function solution(text, pattern) {
  const PADDING = 1;
  const failureTable = failure(pattern);
  const found = [];

  let p = 0;
  for (let t = 0; t < text.length; t++) {
    while (p > 0 && text[t] !== pattern[p]) {
      p = failureTable[p - 1];
    }
    if (text[t] === pattern[p]) {
      p += 1;

      if (p === pattern.length) {
        found.push(t - pattern.length + 1 + PADDING);
        p = failureTable.at(-1);
      }
    }
  }

  return `${found.length}\n${found.join(" ")}`;
}

function failure(pattern) {
  const f = Array(pattern.length).fill(0);

  let prefix = 0;
  for (let suffix = 1; suffix < pattern.length; suffix++) {
    while (prefix > 0 && pattern[prefix] !== pattern[suffix]) {
      prefix = f[prefix - 1];
    }
    if (pattern[prefix] === pattern[suffix]) {
      f[suffix] = prefix + 1;
      prefix += 1;
    }
  }

  return f;
}

console.log(solution(input[0].trimEnd("\n"), input[1].trimEnd("\n")));
