const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(wordList, query) {
  const set = new Set();
  let count = 0;

  wordList.forEach((word) => set.add(word));
  query.forEach((word) => set.has(word) && count++);
  return count;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const word = input.splice(0, N);
console.log(solution(word, input));
