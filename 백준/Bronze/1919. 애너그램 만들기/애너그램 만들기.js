const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(wordA, wordB) {
  const alphabet = Array.from(Array(26), () => [0, 0]);
  const getIndex = (char) => char.charCodeAt(0) - "a".charCodeAt(0);

  for (const char of wordA) {
    const index = getIndex(char);
    alphabet[index][0] += 1;
  }
  for (const char of wordB) {
    const index = getIndex(char);
    alphabet[index][1] += 1;
  }

  return alphabet
    .map(([a, b]) => Math.abs(a - b))
    .reduce((acc, cur) => acc + cur, 0);
}

const [wordA, wordB] = input.map((word) => word.trim());
console.log(solution(wordA, wordB));
