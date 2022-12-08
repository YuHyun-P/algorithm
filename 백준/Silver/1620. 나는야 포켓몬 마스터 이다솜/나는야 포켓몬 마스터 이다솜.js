const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const pokemonMap = (() => {
  const map = new Map();

  for (let line = 1; line < 1 + N; line++) {
    map.set(input[line].trim(), line);
  }
  return map;
})();
const pokemonArray = [...pokemonMap.keys()];
const questions = (() => {
  const temp = [];

  for (let line = 1 + N; line < 1 + N + M; line++) {
    const question = input[line].trim();
    temp.push(Number.isInteger(Number(question)) ? Number(question) : question);
  }
  return temp;
})();

console.log(
  questions
    .map((question) => pokemonMap.get(question) ?? pokemonArray[question - 1])
    .join("\n")
);
