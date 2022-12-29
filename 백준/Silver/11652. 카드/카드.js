const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(card) {
  const map = new Map();
  card.forEach((num) => map.set(num, (map.get(num) ?? 0) + 1));
  const entries = [...map.entries()];

  entries.sort(([numA, countA], [numB, countB]) => {
    const dCount = countB - countA;
    const dNum = numA < numB ? -1 : 1;
    return dCount !== 0 ? dCount : dNum;
  });

  return entries[0][0];
}

input.shift();
const card = input.map((row) => BigInt(row.trim()));
console.log(solution(card).toString());
