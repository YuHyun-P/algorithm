const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);
const cardArray = input[1].trim().split(" ").map(Number);

let max = -1;
const combinations = getCombination(cardArray, 3);
combinations.forEach(update);
console.log(max);

function getCombination(array, n) {
  const result = [];
  if (n === 1) return array.map((pick) => [pick]);

  array.forEach((pick, index, array) => {
    const rest = array.slice(index + 1);
    const combinations = getCombination(rest, n - 1);
    const attach = combinations.map((combination) => [pick, ...combination]);
    result.push(...attach);
  });

  return result;
}

function update([cardA, cardB, cardC]) {
  const sum = cardA + cardB + cardC;
  if (sum > M) return;
  max = Math.max(max, sum);
}
