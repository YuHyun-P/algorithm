const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [pokemonArray, pokemonMap] = (() => {
  const array = [null];
  const map = new Map();

  for (let line = 1; line < 1 + N; line++) {
    const pokemon = input[line].trim();
    array.push(pokemon);
    map.set(pokemon.toLowerCase(), line);
  }
  return [array, map];
})();
const questions = (() => {
  const temp = [];

  for (let line = 1 + N; line < 1 + N + M; line++) {
    const question = input[line].trim().toLowerCase();
    temp.push(
      Number.isInteger(Number(question))
        ? Number(question)
        : question.toLowerCase()
    );
  }
  return temp;
})();

console.log(
  questions
    .map((question) =>
      Number.isInteger(question)
        ? pokemonArray[question]
        : pokemonMap.get(question)
    )
    .join("\n")
);
