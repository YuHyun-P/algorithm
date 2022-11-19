const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
let answer = 0;

for (let line = 1; line <= N; line++) {
  const word = input[line].trim();
  answer += isGroupWord(word) ? 1 : 0;
}

console.log(answer);

function isGroupWord(word) {
  const charSet = new Set();

  return [...word].every((char, index, array) => {
    if (index === 0) {
      charSet.add(char);
      return true;
    }

    if (array[index - 1] === char) {
      return true;
    }

    const answer = !charSet.has(char);
    charSet.add(char);
    return answer;
  });
}
