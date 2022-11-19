/* 입력 */
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const wordArray = [];
for (let line = 1; line <= N; line++) {
  const word = input[line].trim();
  wordArray.push(word);
}

const wordArrayWithoutDuplicates = [...new Set(wordArray)];
wordArrayWithoutDuplicates.sort(sortFn);

console.log(
  wordArrayWithoutDuplicates
    .reduce((acc, cur) => (acc += `${cur}\n`), "")
    .trim()
);

function sortFn(wordA, wordB) {
  const dLength = wordA.length - wordB.length;
  const dDict = wordA < wordB ? -1 : 1;

  return dLength !== 0 ? dLength : dDict;
}
